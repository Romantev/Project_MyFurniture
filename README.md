# Project Furniture Backend

## 1. Einführung

Dieses Projekt ist ein Teil aus einem Fullstack-Bootcamp. Das Projekt ging über 2 Tage und wurde in Teams von 2-3 Entwicklern durchgeführt.
Das Projekt wurde mit VisualStudio Code umgesetzt und dabei wurden die MERN-Stack-Technologien verwendet.
Das Projekt diente zur Übung der bereits gelernten Inhalte des Backends.
Ein simples Tool um Einrichtungsgegenstände zu sortieren, kategoriesieren und aufzulisten.

## 2. Erste Schritte

Um zu starten, navigieren wir in den backend-Ordner des Projekts und installieren alle nötigen Technologien.
In der package.json sind bereits alle Dependencies enthalten.
Dependencies:

- Cloudinary
- dotenv
- express
- mongoose
- multer
  Um diese dann zu nutzen, werden diese mit dem Befehl installiert und ausgeführt:

```js
npm i
```

Als nächstes erstellen wir eine .env-Datei mit Variablen für die Nutzerdaten von [Cloudinary](https://cloudinary.com/) & [mongoose](https://www.mongodb.com/de-de).
Diese sehen wie folgt aus:

```js
CLOUDINARY_CLOUDNAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MONGO_URI=
```

Unter diesen Variablen werden CLOUDNAME, API-KEY, API-SECRET (diese gibt Cloudinary bereits vor wenn ein Nutzerprofil erstellt wird) und der Link zur Datenbank von MongoDB gespeichert ohne diese sichtbar zu machen.
Um diese zu verwenden müssen die eigenen Daten angegeben werden.

Wir haben ein "dev"-Script in der package.json hinzugefügt
"node --watch server.js" welches den Server mit dem Befehl ausführt.

```js
npm run dev
```

## 3. Projektstruktur

Im Hauptordner des backends haben wir die "server.js" erstellt.  
Diese dient zu Erstellung der einzelnen Routen.  
Als Unterordner haben wir einen "models"-Ordner erstellt, indem die Schemata der einzelnen Seiten definiert werden sowie eine index.js wo "mongoose" importiert und verknüpft wird.

Um das ganze abzuschließen, wird noch eine "config.js" erstellt. Hier wird "dotenv" importiert und mit der ".env"-Datei verknüpft.

## 4. Dependencies

Drittanbieter die bei diesem Projekt genutzt wurden:

- [Cloudinary](https://cloudinary.com/)
  Bei Cloudinary werden Bilder abgespeichert die für das Projekt genutzt werden.
  Diese werden vom backend weiter an das frontend geschickt.

- [MongoDB](https://www.mongodb.com/de-de)
  Speichert die angegebenen Daten in einer Datenbank, damit diese weiter verwendet werden können.

## 5. API-Dokumentation

In unserer Datenbank haben wir 3 Collections angelegt:

- BigStuff
- NotSoBigStuff
- SmallStuff

#### Get all items

```http
  GET /api/bigstuff
```

```http
  GET /api/notsobigstuff
```

```http
  GET /api/smallstuff
```

#### Get all items by ID

```http
  GET /api/bigstuff/:id
```

```http
  GET /api/notsobigstuff/:id
```

```http
  GET /api/smallstuff/:id
```

Für alle GET Routen wird anhand der ID nach dem Eintrag gesucht:

```http
  GET /api/${category}/${id}
```

| Parameter | Type   | Description                   |
| :-------- | :----- | :---------------------------- |
| id        | string | Required. Id of item to fetch |

#### Post new Item

```http
  POST /api/bigstuff
```

```http
  POST /api/notsobigstuff
```

```http
  POST /api/smallstuff
```

| Parameter | Type   | Description                                                                |
| :-------- | :----- | :------------------------------------------------------------------------- |
| title     | string | Required                                                                   |
| room      | string | Required, Select-Options(Living-Room, Bedroom, Kitchen, Bathroom. Workroom |
| content   | string | Required                                                                   |
| image     | file   | not Required                                                               |

#### Update Item by ID

```http
  PUT /api/bigstuff/:id
```

```http
  PUT /api/notsobigstuff/:id
```

```http
  PUT /api/smallstuff/:id
```

Um das Objekt zu finden:
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| id | string | Required. Id of item to fetch |

Um den Beitrag ändern zu können:
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| title | string | Required|
| content | string | Required|

#### Delete Item by ID

```http
  DELETE /api/bigstuff/:id
```

```http
  DELETE /api/notsobigstuff/:id
```

```http
  DELETE /api/smallstuff/:id
```

| Parameter | Type   | Description                   |
| :-------- | :----- | :---------------------------- |
| id        | string | Required. Id of item to fetch |
# Project_MyFurniture
