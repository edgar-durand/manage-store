from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class Usuarios(AbstractUser):
    birth_date = models.DateField(verbose_name="birth_date", null=True, blank=True)
    photo = models.CharField(max_length=150, verbose_name="photo", null=True, blank=True)
    street = models.CharField(max_length=150, verbose_name="street", null=True, blank=True)
    number = models.CharField(max_length=150, verbose_name="number", null=True, blank=True)
    between = models.CharField(max_length=150, verbose_name="between", null=True, blank=True)
    municipality = models.CharField(max_length=150, verbose_name="municipality", null=True, blank=True)
    province = models.CharField(max_length=150, verbose_name="province", null=True, blank=True)
    email = models.EmailField(max_length=150, verbose_name="email", unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    facebook = models.CharField(max_length=150, verbose_name="facebook", null=True, blank=True)
    instagram = models.CharField(max_length=150, verbose_name="instagram", null=True, blank=True)
    twitter = models.CharField(max_length=150, verbose_name="twitter", null=True, blank=True)
    phone = models.IntegerField(verbose_name="phone", null=True, blank=True)
    status_message = models.CharField(max_length=150, verbose_name="status_message", null=True, blank=True)


class category(models.Model):
    name = models.CharField(max_length=150, verbose_name="name")
    description = models.CharField(max_length=150, verbose_name="description")
    image = models.CharField(max_length=150, verbose_name="image", null=True, blank=True)

    def __str__(self):
        return self.name


class product(models.Model):
    name = models.CharField(max_length=150, verbose_name="name")
    image = models.ImageField(upload_to="fotos/", null=True, blank=True)
    description = models.CharField(max_length=150, verbose_name="description")
    price_cost = models.FloatField(verbose_name="price_cost")
    price_vent = models.FloatField(verbose_name="price_vent")
    inStock = models.IntegerField(verbose_name="inStock")
    _public = models.BooleanField(verbose_name='_public')
    category = models.ForeignKey(category, on_delete=models.CASCADE)
    user = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='prod_user')

    def __str__(self):
        return self.name


class purchases(models.Model):
    date = models.DateTimeField(verbose_name='date')
    cant = models.IntegerField(verbose_name='cant')
    p_cost = models.FloatField(verbose_name='p_cost')
    product = models.ForeignKey(product, on_delete=models.CASCADE)
    user = models.ForeignKey(Usuarios, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class sales(models.Model):
    date = models.DateField(verbose_name='date')
    cant = models.IntegerField(verbose_name='cant')
    s_amount = models.FloatField(verbose_name="s_amount")
    product = models.ForeignKey(product, on_delete=models.CASCADE)
    user = models.ForeignKey(Usuarios, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class accounts(models.Model):
    name = models.CharField(max_length=150, verbose_name='name')
    description = models.CharField(max_length=150, verbose_name='description')
    a_amount = models.FloatField(verbose_name='a_amount')
    user = models.ForeignKey(Usuarios, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class concept(models.Model):
    name = models.CharField(max_length=150, verbose_name='name')
    description = models.CharField(max_length=150, verbose_name='description')

    def __str__(self):
        return self.name


class movements_account(models.Model):
    date = models.DateField(verbose_name='date')
    m_amount = models.FloatField(verbose_name='m_amount')
    concept = models.ForeignKey(concept, on_delete=models.CASCADE)
    account = models.ForeignKey(accounts, on_delete=models.CASCADE)

    def __str__(self):
        return self.id
