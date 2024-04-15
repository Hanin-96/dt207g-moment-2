# DT207G - Moment 2.1 - API
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera olika CV som kan hämtas samt läggas till mha formulär på en webbplats. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.
## API Länk
En liveversion av APIet finns tillgänglig på följande URL: https://dt207g-moment-2.onrender.com/api/cv

## Databas
APIet använder en PostgreSQL-databas. Databasen innehåller följande tabell:

| Tabellnamn | Fält                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| cv         | **cv_id** (SERIAL PRIMARY KEY), **job_title** (TEXT NOT NULL), **company_name** (TEXT NOT NULL), **location** (TEXT NOT NULL), **description** (TEXT NOT NULL) |

## Användning av CRUD

| Metod   | Ändpunkt     | Beskrivning                       |
| ------- | ------------ | --------------------------------- |
| GET     | /api/cv      | Hämtar alla CV                   |
| GET     | /api/cv/:cvId | Hämtar CV med specifikt ID       |
| POST    | /api/cv      | Lagrar nytt CV i databasen       |
| PUT     | /api/cv/:cvId | Uppdaterar existerande CV med angivet ID |
| DELETE  | /api/cv/:cvId | Raderar CV med angivet ID        |

*Ett CV-objekt returneras/skickas som JSON med följande struktur:*

```
{
    "cv_id": 2,
    "job_title": "Frontend-developer",
    "company_name": "Ikea",
    "location": "Malmö",
    "description": "Var med och skapade webbplats"
  }
  ```
