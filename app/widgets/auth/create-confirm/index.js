'use strict';

var Ractive = require('../auth')
var pinPage = require('../pin')
var animateCheckbox = require('lib/transitions/highlight.js')
function confirm(data){
  var ractive = new Ractive({
    partials: {
      header: require('./header.ract'),
      actions: require('./actions.ract')
    },
    data: {
      passphrase: data.mnemonic
    }
  })

  function isChecked(){
    if(ractive.get('termsChecked') && ractive.get('checked')) {
        ractive.set('setPin', true)
    } else {
        ractive.set('setPin', false)
    }
  }

  ractive.on('toggle-check', function(){
    if(ractive.get('checked')) {
      ractive.set('checked', false)
    } else {
      ractive.set('checked', true)
    }
    isChecked()
  })

  ractive.on('toggle-terms-check', function(){
    if(ractive.get('termsChecked')) {
        ractive.set('termsChecked', false)
    } else {
        ractive.set('termsChecked', true)
    }
    isChecked()
  })

  ractive.on('create-pin', function() {
    if(!ractive.get('checked')) return animateCheckbox(ractive.find('#check'));

    pinPage(confirm, data)
  })

  return ractive
}

module.exports = confirm
