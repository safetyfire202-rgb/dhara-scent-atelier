/**
 * DHARA SCENT ATELIER · NOTIFICATION & EMAIL DISPATCHER ENGINE
 * Automated event triggers, SMTP simulation, and live audit logging.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "dhara_email_audit_logs";

  function getLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveLogs(logs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.error("Failed to save email audit log:", e);
    }
  }

  const Mailer = {
    sendNotificationEmail: function (opts) {
      const now = new Date();
      const timeStr = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) + " " + now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });

      let defaultRecip = "";
      try {
        const rawSettings = localStorage.getItem("dhara_crm_settings");
        if (rawSettings) {
          const parsed = JSON.parse(rawSettings);
          defaultRecip = parsed.notificationEmail || "";
        }
      } catch (e) {}

      const logEntry = {
        id: "EML-" + Date.now().toString(36).toUpperCase(),
        timestamp: now.toISOString(),
        formattedTime: timeStr,
        type: opts.type || "SYSTEM_ALERT",
        recipient: opts.recipient || defaultRecip || "Atelier Recipient",
        subject: opts.subject || "Dhara Scent Atelier Notification",
        details: opts.details || "",
        status: opts.status || "delivered"
      };

      const logs = getLogs();
      logs.unshift(logEntry);
      saveLogs(logs);

      return Promise.resolve(logEntry);
    },

    getEmailLogs: function () {
      return getLogs();
    },

    clearEmailLogs: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    },

    sendTestEmail: function (targetEmail) {
      let defaultRecip = "";
      try {
        const rawSettings = localStorage.getItem("dhara_crm_settings");
        if (rawSettings) {
          const parsed = JSON.parse(rawSettings);
          defaultRecip = parsed.notificationEmail || "";
        }
      } catch (e) {}

      return this.sendNotificationEmail({
        type: "TEST_DISPATCH",
        recipient: targetEmail || defaultRecip || "Atelier Recipient",
        subject: "Dhara Scent Atelier: SMTP Gateway Test Ping",
        details: "Automated test dispatch verified successfully via SMTP Gateway.",
        status: "delivered"
      });
    }
  };

  window.DHARA_MAILER = Mailer;
  window.BK_MAILER = Mailer; // Compatibility alias
})();
