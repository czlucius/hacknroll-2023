
browser.alarms.create("onesecondinterval", {
  periodInMinutes: 1 / 60
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "onesecondinterval") {
    browser.tabs.query({}, async function (tabs) {
      const breakAlarm = await browser.alarms.get("breakAlarm")
      tabs.forEach(tab => {
        browser.tabs.sendMessage(tab.id, JSON.stringify({
          trigger: "onesecondinterval",
          breakAlarm
        }));
      });
    });
  }
});

browser.runtime.onMessage.addListener(data => {
  try {
    const { trigger } = JSON.parse(data);

    // Start Break
    if (trigger === "startBreak") {
      browser.alarms.clear("Breaks");
      browser.alarms.clear("breakAlarm");
      browser.storage.sync.get("breakDuration").then(res => {
        const periodInMinutes = res.breakDuration || 10;
        browser.alarms.create("breakAlarm", {
          periodInMinutes: periodInMinutes / 60
        });
      });
    }

  } catch {

  }
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "breakAlarm") {
    browser.alarms.clear("breakAlarm");
    const periodInSecs = (await browser.storage.sync.get("interval")).interval || 60 * 10

    browser.alarms.create(
        "Breaks",
        {
            periodInMinutes: periodInSecs / 60
        }
    )

    browser.tabs.query({}, function (tabs) {
      tabs.forEach(tab => {
        browser.tabs.sendMessage(tab.id, JSON.stringify({
          trigger: "closeoverlay",
        }));
      });
    });
  }
});