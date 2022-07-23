from django.db import models
from django.utils import timezone


class House(models.Model):

    seller = models.ForeignKey('accounts.Member', on_delete=models.SET_NULL, null=True)

    deal_type = models.ForeignKey('leads.DealType', on_delete=models.SET_NULL, null=True)

    sell_range_lower = models.IntegerField(default=0)

    sell_range_upper = models.IntegerField(default=10000000)

    display = models.BooleanField(default=False)

    address = models.CharField(max_length=64)

    city = models.CharField(max_length=32)

    state = models.CharField(max_length=16)

    zipcode = models.IntegerField(default=0)

    num_bed = models.IntegerField(default=0)

    num_bath = models.IntegerField(default=0)

    sq_ft = models.IntegerField(default=0)

    basement_cond = models.CharField(max_length=16, null=True)

    occupancy = models.CharField(max_length=16, null=True)

    land_use = models.CharField(max_length=32, null=True)

    construct_type = models.CharField(max_length=32, null=True)

    property_tax = models.IntegerField(default=0)

    # Zillow ---> look it up
    # assess/sq_ft = price per sqft --> most highly valued metric when disputing by uniformity
    # can dispute by using market value or uniformity
    assess_value = models.IntegerField(default=0)
    # determined by county
    # comparable --> num stories, ranch vs condo,
    # perfect comp --> same structure, same bed/bath

    notes = models.CharField(max_length=256, null=True)

    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(f'HOUSE: {self.address} {self.city}, {self.state}')


class Picture(models.Model):

    house = models.ForeignKey(House, on_delete=models.CASCADE)

    filename = models.FileField()

    description = models.CharField(max_length=256)

    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(f'PICTURE: {str(self.house)} # {self.id}')





