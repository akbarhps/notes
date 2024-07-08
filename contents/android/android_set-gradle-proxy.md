# Android set proxy in gradle

on file `gradle.properties`, set:

```txt
systemProp.http.proxyHost=192.168.0.1
systemProp.http.proxyPort=7071

systemProp.https.proxyHost=192.168.0.1
systemProp.https.proxyPort=7071
```