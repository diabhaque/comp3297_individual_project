from rest_framework import serializers
from . import models

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            "name",
            "population_size",
            "api_endpoint",
            "resource_url",
            "created_at",
            "updated_at",
        )

        model = models.Location