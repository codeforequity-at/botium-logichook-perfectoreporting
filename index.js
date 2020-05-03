const util = require('util')
const Reporting = require('perfecto-reporting')
const debug = require('debug')('botium-logichook-perfectoreporting')

module.exports = class PerfectoReportingHooks {
  constructor (context, caps = {}) {
    this.context = context
    this.caps = caps
  }

  getTag (convo, convoStep) {
    const result = []
    if (convo && convo.header && convo.header.projectname) {
      result.push(convo.header.projectname)
    }
    if (convo && convo.header && convo.header.name) {
      result.push(convo.header.name)
    }
    if (convoStep && convoStep.stepTag) {
      result.push(convoStep.stepTag)
    }
    if (result.length === 0) {
      result.push('Botium Test')
    }
    return result.join(' - ')
  }

  async onConvoBegin ({ convo, container }) {
    if (container && container.pluginInstance && container.pluginInstance.browser) {
      debug('Found Botium Webdriver Connector instance, activating Perfecto Reporting')

      container.perfectoReportingClient = new Reporting.Perfecto.PerfectoReportingClient(new Reporting.Perfecto.PerfectoExecutionContext({
        webdriver: {
          executeScript: async (command, params) => {
            debug(`Executing Perfecto Reporting Script: ${command} / ${util.inspect(params)}`)
            return container.pluginInstance._runInQueue(async () => {
              try {
                await container.pluginInstance.browser.execute(command, params)
              } catch (err) {
                console.err(`Executing Perfecto Reporting Script failed: ${err.message}`)
              }
            })
          }
        }
      }))
      await container.perfectoReportingClient.testStart(this.getTag(convo))
    }
  }

  async onMeStart ({ convo, convoStep, container }) {
    if (container.perfectoReportingClient) {
      await container.perfectoReportingClient.stepStart(this.getTag(convo, convoStep))
    }
  }

  async onBotStart ({ convo, convoStep, container }) {
    if (container.perfectoReportingClient) {
      await container.perfectoReportingClient.stepStart(this.getTag(convo, convoStep))
    }
  }

  async onConvoEnd ({ convo, container, transcript }) {
    if (container.perfectoReportingClient) {
      if (transcript.err) {
        await container.perfectoReportingClient.testStop({
          status: Reporting.Constants.results.failed,
          message: transcript.err
        })
      } else {
        await container.perfectoReportingClient.testStop({
          status: Reporting.Constants.results.passed
        })
      }
    }
  }
}
