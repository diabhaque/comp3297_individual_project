from rest_framework import serializers
from . import models

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            "name",
            "populationSize",
            "apiEndpoint",
            "resourceURL",
            "createdAt",
            "updatedAt",
        )

        model = models.Location