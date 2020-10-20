// eslint-disable-next-line no-console
const consoleLog = console.log.bind(console);
const levels = require('../levels');

function consoleAppender(layout, timezoneOffset, level) {

  return (loggingEvent) => {
    if (level && loggingEvent.level.level < levels.getLevel(level).level) return;
    
    consoleLog(layout(loggingEvent, timezoneOffset));
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return consoleAppender(layout, config.timezoneOffset, config.level);
}

module.exports.configure = configure;
