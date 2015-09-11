
// for unit tests
if (typeof jasmine !== "undefined") var window = { console: console };

(function () {
    "use strict";

    var disableWarn = false;
    var disableLog = false;

    // use 'logsaviour' or just 'sav'
    window.sav = window.logsaviour = {

        disableLogs: function (_disableWarn, _disableLog) {

            disableWarn = !!_disableWarn;
            disableLog = !!_disableLog;
        }

		, warn: function () {

		    if (disableWarn) return;

		    var cns = window.console, args, i, len;

		    // first check console exists safely for all browsers
		    if (typeof (cns) !== 'undefined') {

		        // Then check warn exists
		        if (cns.warn) {

		            /**
					 * For some reason emulated IE8 (using IE11) throws a nasty error for console.warn.apply,
					 * so here we just check for it using a string to check for an empty object.
					 */
		            var isIE8Emulated = (JSON.stringify && JSON.stringify(cns) === "{}");

		            // Then check apply exists
		            if (!isIE8Emulated && cns.warn.apply) {

		                // Modern browsers should get to here
		                cns.warn.apply(cns, arguments);
		            } else {

		                // IE8 and perhaps other old browsers without 'apply' support, print a string
		                args = "";
		                i = 0;
		                len = arguments.length;
		                for (; i < len; i++) { args += arguments[i] + ", "; }
		                cns.warn(args);
		            }
		        } else if (cns.log) { // fallback to log if warn not supported

		            // Then check apply exists
		            if (cns.log.apply) {
		                cns.log.apply(cns, arguments);
		            } else {
		                // If no apply, print a string to log
		                args = "";
		                i = 0;
		                len = arguments.length;
		                for (; i < len; i++) { args += arguments[i] + ", "; }
		                cns.warn(args);
		            }
		        }
		    } // end typeof

		    // No warning for other browsrs. They must be pretty old though, like IE6 and below.
		}


		, log: function () {

		    if (disableLog) return;

		    var cns = window.console;

		    // first check console exists safely for all browsers
		    if (typeof (cns) !== 'undefined') {

		        // Check log exists
		        if (cns.log) {

		            /**
					 * For some reason emulated IE8 (using IE11) throws a nasty error for console.log.apply,
					 * so here we just check for it using a string to check for an empty object.
					 */
		            var isIE8Emulated = (JSON.stringify && JSON.stringify(cns) === "{}");

		            // Then check apply exists
		            if (!isIE8Emulated && cns.log.apply) {
		                cns.log.apply(cns, arguments);
		            } else {
		                // If no apply, print a string to log
		                var args = "", i = 0, len = arguments.length;
		                for (; i < len; i++) { args += arguments[i] + ", "; }
		                cns.warn(args);
		            }
		        }
		    } // end typeof
		}

    }
})();


// for unit tests
if (typeof jasmine !== "undefined") module.exports = window.logsaviour;