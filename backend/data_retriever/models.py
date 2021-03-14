from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=50)
    populationSize = models.BigIntegerField()
    apiEndpoint = models.URLField()
    resourceURL = models.URLField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
