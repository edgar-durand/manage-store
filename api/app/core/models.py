from django.db import models

# Create your models here.
from django.forms import model_to_dict


class concepto(models.Model):
    nombre = models.CharField(max_length=150, verbose_name="Nombre")
    tipo = models.CharField(max_length=50, verbose_name="Tipo Concepto")  # Entrada o Salida
    descripcion = models.CharField(max_length=300, verbose_name="Descripcion")

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Concepto'
        verbose_name_plural = 'Conceptos'
        db_table = 'concepto'


class tesoreria(models.Model):
    nombre = models.CharField(max_length=150, verbose_name="Nombre")
    descripcion = models.CharField(max_length=300, verbose_name="Descripcion")

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Tesoreria'
        verbose_name_plural = 'Tesorerias'
        db_table = 'tesoreria'


class movimientos(models.Model):
    fecha = models.DateField(verbose_name="Fecha")
    tipo = models.CharField(max_length=50, verbose_name="Tipo de Movimiento")
    concepto = models.ForeignKey(concepto, max_length=50, verbose_name="Concepto", on_delete=models.DO_NOTHING)
    tesoreria = models.ForeignKey(tesoreria, max_length=50, verbose_name="Tesoreria", on_delete=models.DO_NOTHING)
    importe = models.FloatField(verbose_name="Importe")
    descripcion = models.TextField(verbose_name="descripcion")

    def __str__(self):
        return self.id

    class Meta:
        verbose_name = 'Movimiento'
        verbose_name_plural = 'Movimientos'
        db_table = 'movimientos'


class red(models.Model):
    nombre = models.CharField(max_length=150, verbose_name='Nombre')
    mentor = models.CharField(max_length=150, verbose_name='Mentor')
    secretario = models.CharField(max_length=150, verbose_name='Secretario', unique=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Red'
        verbose_name_plural = 'Redes'
        db_table = 'Red'

    def ToJson(self):
        item = model_to_dict(self)
        return item


class casa_paz(models.Model):
    nombre = models.CharField(max_length=150, verbose_name="Nombre")
    lider = models.CharField(max_length=150, verbose_name="Lider")
    direccion = models.CharField(max_length=300, verbose_name="Direccion")
    telefono = models.CharField(max_length=300, verbose_name="telefono", null=True, blank=True)
    red = models.ForeignKey(red, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Casa de Paz'
        verbose_name_plural = 'Casas de Paz'
        db_table = 'casa_paz'

    def ToJson(self):
        item = model_to_dict(self)
        return item


class rep_casa_paz(models.Model):
    fecha = models.DateField()
    asist_total = models.PositiveIntegerField(verbose_name="Asistencia")
    cant_visita = models.PositiveIntegerField(verbose_name="Visitas")
    cant_nc = models.PositiveIntegerField(verbose_name="Nuevos Convertidos")
    cant_bajas = models.PositiveIntegerField(verbose_name="Bajas")
    ofrendas = models.FloatField(verbose_name="Ofrendas")
    casa_paz = models.ForeignKey(casa_paz, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        verbose_name = 'Reporte de Casa de Paz'
        verbose_name_plural = 'Reportes de Casas de Paz'
        db_table = 'rep_casa_paz'

    def __str__(self):
        return self.id

    class Meta:
        verbose_name = 'Diezmo'
        verbose_name_plural = 'Diezmos'
        db_table = 'diezmos'


class membresia(models.Model):
    foto = models.ImageField(upload_to="fotos/", null=True, blank=True)
    Exp = models.PositiveIntegerField(verbose_name="Expediente")
    estado_membresia = models.CharField(max_length=50, verbose_name="Estado del Miembro")
    ci = models.CharField(max_length=11, verbose_name="Carne de Identidad", null=True, blank=True)
    nombres = models.CharField(max_length=150, verbose_name="Nombres")
    apellido1 = models.CharField(max_length=150, verbose_name="Primer Apellido")
    apellido2 = models.CharField(max_length=150, verbose_name="Segundo Apellido")
    direccion = models.TextField(verbose_name="Direccion", null=True, blank=True)
    fecha_nacimiento = models.DateField(verbose_name="Fecha de Nacimiento", null=True, blank=True)
    sexo = models.CharField(max_length=50, verbose_name="Sexo")
    estado_civil = models.CharField(max_length=50, verbose_name="Estado Civil", null=True, blank=True)
    telf_fijo = models.CharField(max_length=60, verbose_name="Telefono Fijo", null=True, blank=True)
    telf_celular = models.CharField(max_length=60, verbose_name="Telefono Celular", null=True, blank=True)
    telf_cercano = models.CharField(max_length=60, verbose_name="Telefono Cercano", null=True, blank=True)
    correo_electronico = models.EmailField(max_length=100, verbose_name="Correo Electronico", null=True, blank=True)
    ocupacion = models.CharField(max_length=100, verbose_name="Ocupacion")
    centro_lab = models.CharField(max_length=100, verbose_name="Centro de Trabajo o Estudio", null=True, blank=True)
    fecha_conversion = models.DateField(verbose_name="Fecha de Conversion", null=True, blank=True)
    fecha_bautismo = models.DateField(verbose_name="Fecha de Bautismo", null=True, blank=True)
    bautismo_ES = models.BooleanField(verbose_name="Bautismo Espiritu Santo", null=True, blank=True)
    cargo_iglesia = models.CharField(max_length=150, null=True, verbose_name="Cargo en la Iglesia", blank=True)
    # mentor = models.CharField(max_length=150, null=True, verbose_name="Mentor")
    mentor_asig = models.ForeignKey('self', on_delete=models.NOT_PROVIDED, null=True, blank=True)
    casa_paz = models.ForeignKey(casa_paz, on_delete=models.NOT_PROVIDED, null=True, blank=True)

    def __str__(self):
        return self.nombres + ' ' + self.apellido1 + ' ' + self.apellido2

    class Meta:
        verbose_name = 'Miembros'
        verbose_name_plural = 'Miembros'
        db_table = 'miembros'

    def ToJson(self):
        item = model_to_dict(self)
        return item


class diezmo(models.Model):
    fecha = models.DateField()
    importe = models.FloatField(verbose_name="Importe")
    miembro = models.ForeignKey(membresia, on_delete=models.NOT_PROVIDED)


class excercises(models.Model):
    title = models.CharField(max_length=150, verbose_name="Titulo")
    description = models.CharField(max_length=200, verbose_name="Descripcion")
    img = models.CharField(max_length=150, verbose_name="Imagen")
    leftColor = models.CharField(max_length=150, verbose_name="leftColor")
    rightColor = models.CharField(max_length=150, verbose_name="rightColor")

    def ToJson(self):
        item = [{
            'title': self.title,
            'description': self.description,
            'img': self.img,
            'colores':{
                'leftColor': self.leftColor,
                'rightColor':self.rightColor
            }
        }]
        data=model_to_dict(item)
        return data
