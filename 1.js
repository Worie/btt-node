// get the package as a dependency
const BTT = require('btt-node');

  // initialize main BTT instance
  const btt = new BTT({
    domain: '127.0.0.1',
    port: '64472',
    protocol: 'http',
  });

  // get existing touch bar widget
  const touchBarWidget = btt.Widget({
    // uuid of the tb widget, you can PPM it and copy from within BTT
    uuid: 'YOUR-LONG-UUID-STRING',
    // default value used for updating the widget contents without arguments
    default: () => {
      return {
        // the text that you want to set to your widget
        text: 'Default: '+ new Date(),
      };
    },
  });

  // will use the defaults passed during widget initialization within node
  // and will show the current date with `Default: prefix`
  setInterval(() => {
    widget.update();
  }, 1000);

  // you can also refresh the widget contents:
  widget.refresh();

  // and "click" it 
  widget.click();

  // get existing trigger: 
  const trigger = btt.Trigger({
    uuid: 'YOUR-LONG-UUID-STRING',
  });

  // create a new trigger with a json: 
  btt.Trigger.new({});

  // update existing trigger contents
  trigger.update(data);

  // calls predefined trigger
  trigger.invoke();