<img src="/images/logo.svg" width="228"/>

# Greg

An easy to use calendar for KaiOs

![image-1](/images/mockup.png)

## How to use

- Key 1 & 3 : Jump between the months
- Key \* : Jump to current Day
- Key Enter: toggle views
- Key 2: event slider in month view
- Key #: toggle moon phase view
- Key SoftLeft: Add event
- Key SoftLeft Longpress: Add Event with template
- <kbn>0</kbn> Single category view

### Nextcloud account

if you want to use an external calendar, you have to enter the correct server address.  
at nextcloud as follows:

    - server: "https://xxxxx/remote.php/dav",
    - username: "xxxxm",
    - password: "xxxxx",

## Features

- Local Calendar
- Nextcloud calendar
- Google Calendar
- subscribe to calendar
- moon phases

I tested subscribing to calendar with google calendar. you have the possibility to subscribe to public calendars and private calendars, in the google calendar settings you will find an ID that you can enter in greg (by hand or qr code).

## How to install

- KaiOs Store
- Sideloading <a href="https://www.martinkaptein.com/blog/sideloading-and-deploying-apps-to-kai-os/">step-by-step article</a> by martinkaptein

You can download the latest version from the Releases page.
The app is not auto-updating. To update it, you have to follow the same steps you took when installing it.

### LICENSES

This software (except KaiAds) is open source and licensed under the MIT License. View the source code.

- tsdav https://github.com/natelindev/tsdav MIT License
- mithril https://github.com/MithrilJS MIT License

### Privacy Policy

This software uses KaiAds. This is a third party service that may collect information used to identify you. Pricacy policy of KaiAds.
If you connect a Google account to greg, it is possible that Google collects information about you, or identifies you.

### Dev

If you want to create your own version of the app you need to use your own google oaut cred. you have to create a file with this content
/assets/js/google_cred.js

```
const google_cred = {
  clientId:
    "",
  clientSecret: "",
};
```

## Donation

If you use the app often, please donate an amount to me.
<br>

<table class="border-0"> 
  <tr class="border-0" >
    <td valign="top" class="border-0">
        <div>
            <a href="https://paypal.me/strukturart?locale.x=de_DE" target="_blank">
                <img src="/images/paypal.png" width="120px">
            </a>
        </div>
    </td>
    <td valign="top" class="border-0">
        <div>
            <div>Bitcoin</div>
            <img src="/images/bitcoin_rcv.png" width="120px">
        </div>
    </td>
  </tr>
 </table>
