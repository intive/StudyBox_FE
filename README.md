# StudyBox_FE
StudyBox Web Front end - BLStream Patronage 2016 application


Użycie Angular Material

Style definiujemy poprzez odpowiednie klasy. Wykaz elementów, które można stosować, jest na stronie AM.

Kolory "dark blue" i "raspberry" są bazą dla podstawowego schematu kolorystycznego, pierwszy w palecie "primary", drugi "accent". Do tego są domyślne "warn" i "background".
Jeśli ktoś potrzebuje pozostałych dwóch kolorów ("graphite" i "grey"), musi dla danego elementu zmienić schemat na "alt" - one też są w nim bazami dla palet "primary" i "accent", palety "warn" i "background" będą bez zmian.

Przykład:
```HTML
<div md-theme="alt">
  <md-button class="md-primary" type="submit">Button</md-button> //ten będzie ciemnoszary
</div>
<div>
  <md-button class="md-primary" type="submit">Button</md-button> //a ten niebieski
</div>
```
