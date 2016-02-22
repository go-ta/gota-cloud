'use strict';

module.exports = [

  {
    manifest: { version: '0.0.0' },
    init: function(){},
    id: 'service00'
  },

  {
    manifest: {
      version: '0.1.0',
      dependencies: {
        service00: '0.0.0'
      }
    },
    init: function(){},
    id: 'service01'
  },

  {
    manifest: {
      version: '0.2.0',
      dependencies: {
        service00: '2.0.0'
      }
    },
    init: function(){},
    id: 'service02'
  },

  {
    manifest: {
      version: '0.3.0',
      dependencies: {
        service00: '0.0.0'
      }
    },
    init: function(){},
    id: 'service03'
  }
];