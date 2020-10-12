/*
	ImportExportTools NG is a derivative extension for Thunderbird 60+
	providing import and export tools for messages and folders.
	The derivative extension authors:
		Copyright (C) 2019 : Christopher Leidigh, The Thunderbird Team

	The original extension & derivatives, ImportExportTools, by Paolo "Kaosmos",
	is covered by the GPLv3 open-source license (see LICENSE file).
		Copyright (C) 2007 : Paolo "Kaosmos"

	ImportExportTools NG is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// cleidigh - Convert in-line script, reformat, globals

/* global IETprefs, IETgetComplexPref, setupHotKeys */

var { Services } = ChromeUtils.import('resource://gre/modules/Services.jsm');

async function IETmessOverlayInit() {
	// alert("Starting backup");
	Services.console.logStringMessage("Start overland");
	var w = Cc["@mozilla.org/appshell/window-mediator;1"]
		.getService(Ci.nsIWindowMediator)
		.getMostRecentWindow("mail:3pane");
	var last = w.IETprefs.getIntPref("extensions.importexporttoolsng.autobackup.last");
	var frequency = w.IETprefs.getIntPref("extensions.importexporttoolsng.autobackup.frequency");
	if (frequency === 0)
		return;
	
	if (frequency === 99)
		frequency = 0.002;

	var now = new Date;
	var time = now.getTime();
	time = time / 1000;
	var days = 24 * 60 * 60 * frequency;
	// var days = 0.005;
	console.debug('OverlayBackup');
	console.debug(time-last);
	console.debug(days);

	// if ((time - last) < days)
	// 	return;

	var WM = Cc['@mozilla.org/appshell/window-mediator;1']
		.getService(Ci.nsIWindowMediator);
	// var os = navigator.platform.toLowerCase();
	// let { os } = await messenger.runtime.getPlatformInfo();
	let os = "";
	var wins;
	if (os.includes("mac"))
		wins = WM.getEnumerator(null);
	else
		wins = WM.getEnumerator("mail:3pane");
	if (!wins.hasMoreElements()) {
		if (w.IETprefs.getBoolPref("extensions.importexporttoolsng.autobackup.use_modal_dialog"))
			w.openDialog("chrome://mboximport/content/mboximport/autobackup.xhtml", "", "chrome,centerscreen,modal", last, time, now);
		else
			w.openDialog("chrome://mboximport/content/mboximport/autobackup.xhtml", "", "chrome,centerscreen", last, time, now);
	}

	w.openDialog("chrome://mboximport/content/mboximport/autobackup.xhtml", "", "chrome,centerscreen,modal", last, time, now);
	console.debug(w);
	console.debug('still the finished ');
}

// IETmessOverlayInit();

// window.addEventListener("unload", IETmessOverlayInit, false);
// window.addEventListener("keydown", keyEvent, false);