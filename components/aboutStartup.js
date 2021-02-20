/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { classes: Cc, interfaces: Ci, manager: Cm, utils: Cu } = Components;
Cm.QueryInterface(Ci.nsIComponentRegistrar);

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

var factory;

function AboutStartup() {}

AboutStartup.prototype = {
  classDescription: "about:startup",
  contractID: '@mozilla.org/network/protocol/about;1?what=startup',
  classID: Components.ID('{ef5c36bf-8559-4449-8133-03e30e83c708}'),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

  getURIFlags: function(aURI) {
    return Ci.nsIAboutModule.ALLOW_SCRIPT;
  },

  newChannel: function(aURI, aLoadInfo) {
    let uri = Services.io.newURI("chrome://aboutstartup/content/aboutstartup.html", null, null);
    let channel = Services.io.newChannelFromURIWithLoadInfo(uri, aLoadInfo);
    channel.originalURI = aURI;
    return channel;
  }

};

let NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutStartup]);