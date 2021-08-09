# PEPARING

PEPARING stands for Landslide Inventory Participatory Mapping.
Developed using Leaflet, Leaflet Draw, ESRI Terraformer Core and ESRI Terraformer WKT Parser.
Backend using PHP, database using PostgreSQL - PostGIS.

##
**Installation Guide**
1. Clone this repository
2. Create postgis database table from **archive/create_table_db.sql**
3. Change database config (host, port, user, password, database name) on **dataservice/dbconfig.php**
4. Enable extention **pgsql** and **pdo_pgsql** on **php.ini**

##
URL: [https://peparing.geo.ugm.ac.id/](https://peparing.geo.ugm.ac.id/)

Android App: [Download peparing.apk](https://raw.githubusercontent.com/anshori/peparing/master/android-apps/peparing.apk) or
<a id="raw-url" href="https://www.dropbox.com/s/xtu8d1bq0wfp9a5/peparing.apk?dl=0">Download from dropbox</a>

##
>Source: [https://github.com/andyprasetya/leaflet-CRUD](https://github.com/andyprasetya/leaflet-CRUD)