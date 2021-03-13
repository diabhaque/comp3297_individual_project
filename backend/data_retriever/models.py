from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=50)
    population_size = models.BigIntegerField()
    api_endpoint = models.URLField()
    resource_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
