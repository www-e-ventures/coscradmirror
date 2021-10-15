# Making Post Requests to API

## Sample Data

Let's say you want to post the following `Term`:

```js
{
    "id": "3",
    "term": "bela",
    "termEnglish": "his or her hand",
    "contributor": "William Myers"
  }
```

then you can submit the following post request via CURL:

> > `curl -X POST -H "Content-Type: application/json" -d '{"id":"6","term":"nexwela","contributor":"William Myers"}' http://localhost:3333/api/term`
