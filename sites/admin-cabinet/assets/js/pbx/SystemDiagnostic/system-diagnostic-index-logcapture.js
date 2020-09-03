"use strict";

/*
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 8 2020
 */

/* global sessionStorage, PbxApi */
var systemDiagnosticCapture = {
  $startBtn: $('#start-capture-button'),
  $stopBtn: $('#stop-capture-button'),
  $showBtn: $('#show-last-log'),
  initialize: function () {
    function initialize() {
      if (sessionStorage.getItem('LogsCaptureStatus') === 'started') {
        systemDiagnosticCapture.$startBtn.addClass('disabled loading');
        systemDiagnosticCapture.$stopBtn.removeClass('disabled');
      } else {
        systemDiagnosticCapture.$startBtn.removeClass('disabled loading');
        systemDiagnosticCapture.$stopBtn.addClass('disabled');
      }

      systemDiagnosticCapture.$startBtn.on('click', function (e) {
        e.preventDefault();
        systemDiagnosticCapture.$startBtn.addClass('disabled loading');
        systemDiagnosticCapture.$stopBtn.removeClass('disabled');
        PbxApi.SyslogStartLogsCapture();
      });
      systemDiagnosticCapture.$stopBtn.on('click', function (e) {
        e.preventDefault();
        systemDiagnosticCapture.$startBtn.removeClass('disabled loading');
        systemDiagnosticCapture.$stopBtn.addClass('disabled');
        PbxApi.SyslogStopLogsCapture();
      });
    }

    return initialize;
  }()
};
$(document).ready(function () {
  systemDiagnosticCapture.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TeXN0ZW1EaWFnbm9zdGljL3N5c3RlbS1kaWFnbm9zdGljLWluZGV4LWxvZ2NhcHR1cmUuanMiXSwibmFtZXMiOlsic3lzdGVtRGlhZ25vc3RpY0NhcHR1cmUiLCIkc3RhcnRCdG4iLCIkIiwiJHN0b3BCdG4iLCIkc2hvd0J0biIsImluaXRpYWxpemUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJQYnhBcGkiLCJTeXNsb2dTdGFydExvZ3NDYXB0dXJlIiwiU3lzbG9nU3RvcExvZ3NDYXB0dXJlIiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQU1BO0FBRUEsSUFBTUEsdUJBQXVCLEdBQUc7QUFDL0JDLEVBQUFBLFNBQVMsRUFBRUMsQ0FBQyxDQUFDLHVCQUFELENBRG1CO0FBRS9CQyxFQUFBQSxRQUFRLEVBQUVELENBQUMsQ0FBQyxzQkFBRCxDQUZvQjtBQUcvQkUsRUFBQUEsUUFBUSxFQUFFRixDQUFDLENBQUMsZ0JBQUQsQ0FIb0I7QUFJL0JHLEVBQUFBLFVBSitCO0FBQUEsMEJBSWxCO0FBQ1osVUFBSUMsY0FBYyxDQUFDQyxPQUFmLENBQXVCLG1CQUF2QixNQUFnRCxTQUFwRCxFQUErRDtBQUM5RFAsUUFBQUEsdUJBQXVCLENBQUNDLFNBQXhCLENBQWtDTyxRQUFsQyxDQUEyQyxrQkFBM0M7QUFDQVIsUUFBQUEsdUJBQXVCLENBQUNHLFFBQXhCLENBQWlDTSxXQUFqQyxDQUE2QyxVQUE3QztBQUNBLE9BSEQsTUFHTztBQUNOVCxRQUFBQSx1QkFBdUIsQ0FBQ0MsU0FBeEIsQ0FBa0NRLFdBQWxDLENBQThDLGtCQUE5QztBQUNBVCxRQUFBQSx1QkFBdUIsQ0FBQ0csUUFBeEIsQ0FBaUNLLFFBQWpDLENBQTBDLFVBQTFDO0FBQ0E7O0FBQ0RSLE1BQUFBLHVCQUF1QixDQUFDQyxTQUF4QixDQUFrQ1MsRUFBbEMsQ0FBcUMsT0FBckMsRUFBOEMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BEQSxRQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQVosUUFBQUEsdUJBQXVCLENBQUNDLFNBQXhCLENBQWtDTyxRQUFsQyxDQUEyQyxrQkFBM0M7QUFDQVIsUUFBQUEsdUJBQXVCLENBQUNHLFFBQXhCLENBQWlDTSxXQUFqQyxDQUE2QyxVQUE3QztBQUNBSSxRQUFBQSxNQUFNLENBQUNDLHNCQUFQO0FBQ0EsT0FMRDtBQU1BZCxNQUFBQSx1QkFBdUIsQ0FBQ0csUUFBeEIsQ0FBaUNPLEVBQWpDLENBQW9DLE9BQXBDLEVBQTZDLFVBQUNDLENBQUQsRUFBTztBQUNuREEsUUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0FaLFFBQUFBLHVCQUF1QixDQUFDQyxTQUF4QixDQUFrQ1EsV0FBbEMsQ0FBOEMsa0JBQTlDO0FBQ0FULFFBQUFBLHVCQUF1QixDQUFDRyxRQUF4QixDQUFpQ0ssUUFBakMsQ0FBMEMsVUFBMUM7QUFDQUssUUFBQUEsTUFBTSxDQUFDRSxxQkFBUDtBQUNBLE9BTEQ7QUFPQTs7QUF6QjhCO0FBQUE7QUFBQSxDQUFoQztBQTRCQWIsQ0FBQyxDQUFDYyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFNO0FBQ3ZCakIsRUFBQUEsdUJBQXVCLENBQUNLLFVBQXhCO0FBQ0EsQ0FGRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgwqkgTUlLTyBMTEMgLSBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcbiAqIFByb3ByaWV0YXJ5IGFuZCBjb25maWRlbnRpYWxcbiAqIFdyaXR0ZW4gYnkgTmlrb2xheSBCZWtldG92LCA4IDIwMjBcbiAqL1xuLyogZ2xvYmFsIHNlc3Npb25TdG9yYWdlLCBQYnhBcGkgKi9cblxuY29uc3Qgc3lzdGVtRGlhZ25vc3RpY0NhcHR1cmUgPSB7XG5cdCRzdGFydEJ0bjogJCgnI3N0YXJ0LWNhcHR1cmUtYnV0dG9uJyksXG5cdCRzdG9wQnRuOiAkKCcjc3RvcC1jYXB0dXJlLWJ1dHRvbicpLFxuXHQkc2hvd0J0bjogJCgnI3Nob3ctbGFzdC1sb2cnKSxcblx0aW5pdGlhbGl6ZSgpIHtcblx0XHRpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnTG9nc0NhcHR1cmVTdGF0dXMnKSA9PT0gJ3N0YXJ0ZWQnKSB7XG5cdFx0XHRzeXN0ZW1EaWFnbm9zdGljQ2FwdHVyZS4kc3RhcnRCdG4uYWRkQ2xhc3MoJ2Rpc2FibGVkIGxvYWRpbmcnKTtcblx0XHRcdHN5c3RlbURpYWdub3N0aWNDYXB0dXJlLiRzdG9wQnRuLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzeXN0ZW1EaWFnbm9zdGljQ2FwdHVyZS4kc3RhcnRCdG4ucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkIGxvYWRpbmcnKTtcblx0XHRcdHN5c3RlbURpYWdub3N0aWNDYXB0dXJlLiRzdG9wQnRuLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdH1cblx0XHRzeXN0ZW1EaWFnbm9zdGljQ2FwdHVyZS4kc3RhcnRCdG4ub24oJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHN5c3RlbURpYWdub3N0aWNDYXB0dXJlLiRzdGFydEJ0bi5hZGRDbGFzcygnZGlzYWJsZWQgbG9hZGluZycpO1xuXHRcdFx0c3lzdGVtRGlhZ25vc3RpY0NhcHR1cmUuJHN0b3BCdG4ucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHRQYnhBcGkuU3lzbG9nU3RhcnRMb2dzQ2FwdHVyZSgpO1xuXHRcdH0pO1xuXHRcdHN5c3RlbURpYWdub3N0aWNDYXB0dXJlLiRzdG9wQnRuLm9uKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRzeXN0ZW1EaWFnbm9zdGljQ2FwdHVyZS4kc3RhcnRCdG4ucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkIGxvYWRpbmcnKTtcblx0XHRcdHN5c3RlbURpYWdub3N0aWNDYXB0dXJlLiRzdG9wQnRuLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0UGJ4QXBpLlN5c2xvZ1N0b3BMb2dzQ2FwdHVyZSgpO1xuXHRcdH0pO1xuXG5cdH0sXG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdHN5c3RlbURpYWdub3N0aWNDYXB0dXJlLmluaXRpYWxpemUoKTtcbn0pO1xuXG4iXX0=