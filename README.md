# Botium Logic Hook for Perfecto Reporting

[![NPM](https://nodei.co/npm/botium-logichook-perfectoreporting.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botium-logichook-perfectoreporting/)

[![Codeship Status for codeforequity-at/botium-logichook-perfectoreporting](https://app.codeship.com/projects/dba9c0e0-6f7b-0138-9604-12801435fc46/status?branch=master)](https://app.codeship.com/projects/395107)
[![npm version](https://badge.fury.io/js/botium-logichook-perfectoreporting.svg)](https://badge.fury.io/js/botium-logichook-perfectoreporting)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

This [Botium](https://www.botium.ai) extension attaches itself to the [Botium Webdriver Connector](https://github.com/codeforequity-at/botium-connector-webdriverio) and uses the [Perfecto Reporting SDK](https://github.com/PerfectoCode/reporting-node-sdk) to write Botium test information to the [PERFECTO SMART REPORTING AND ANALYTICS](https://www.perfecto.io/platform/analytics-reporting) Dashboard.

__Did you read the [Botium in a Nutshell](https://medium.com/@floriantreml/botium-in-a-nutshell-part-1-overview-f8d0ceaf8fb4) articles ? Be warned, without prior knowledge of Botium you won't be able to properly use this library!__

## Using with Botium Core / Botium CLI / Botium Bindings

Install the extension:

    > npm install botium-logichook-perfectoreporting

Register this extension in _botium.json_:

``` 
{
  "botium": {
    "Capabilities": {
      ...
      "LOGIC_HOOKS": [
        {
          "ref": "PERFECTO-REPORTING",
          "src": "botium-logichook-perfectoreporting",
          "global": true
        }
      ]
      ...    
    }
  }
}
```

## Using with Botium Box

It is already part of Botium Box. You have to enable it in the [Registered Components View](https://botium.atlassian.net/wiki/spaces/BOTIUM/pages/2293815/Botium+Asserters).

