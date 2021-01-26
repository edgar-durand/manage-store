from django.forms import *
from setuptools.msvc import winreg

from core.models import red, casa_paz, membresia, concepto, tesoreria, movimientos, rep_casa_paz, diezmo


class RedesForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['nombre'].widget.attrs['autofocus'] = True

    class Meta:
        model = red
        fields = '__all__'
        widgets = {
            'nombre': TextInput(
                attrs={
                    'placeholder': 'Nombre de la red'
                }
            ),
            'mentor': TextInput(
                attrs={
                    'placeholder': 'Mentor de la Red'
                }
            ),
            'secretario': TextInput(
                attrs={
                    'placeholder': 'Secretario de la Red'
                }
            )

        }


class CasaPazForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['nombre'].widget.attrs['autofocus'] = True

    class Meta:
        model = casa_paz
        fields = '__all__'
        widgets = {
            'nombre': TextInput(
                attrs={
                    'placeholder': 'Nombre de la Casa de Paz'
                }
            ),
            'lider': TextInput(
                attrs={
                    'placeholder': 'Nombre del Lider'
                }
            ),
            'direccion': TextInput(
                attrs={
                    'placeholder': 'Direccion de la casa de paz'
                }
            ),
            'telefono': TextInput(
                attrs={
                    'placeholder': 'Telefono de la casa de paz'
                }
            )

        }


class MembresiaForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['Exp'].widget.attrs['autofocus'] = True

    class Meta:
        model = membresia
        fields = '__all__'

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                form.save()
            else:
                data['error'] = form.errors

        except Exception as e:
            data['error'] = str(e)

        return data


class ConceptoForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['nombre'].widget.attrs['autofocus'] = True

    class Meta:
        model = concepto
        fields = '__all__'
        widgets = {
            'nombre': TextInput(
                attrs={
                    'placeholder': 'Concepto'
                }
            ),
            'tipo': TextInput(
                attrs={
                    'placeholder': 'De Entrada o Salida'

                }
            ),
            'descripcion': TextInput(
                attrs={
                    'placeholder': 'Descripcion'
                }
            )

        }


class TesoreriaForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['nombre'].widget.attrs['autofocus'] = True

    class Meta:
        model = tesoreria
        fields = '__all__'
        widgets = {
            'nombre': TextInput(
                attrs={
                    'placeholder': 'Nombre de Tesoreria'
                }
            ),
            'descripcion': TextInput(
                attrs={
                    'placeholder': 'Descripcion de la Tesoreria'
                }
            )

        }


class MovimientosForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['fecha'].widget.attrs['autofocus'] = True

    class Meta:
        model = movimientos
        fields = '__all__'
        widgets = {
            'fecha': DateInput(
                attrs={
                    'placeholder': 'Fecha'
                }
            ),
            'tipo': Select(
                choices={

                    ('Salida', 'Salida'),
                    ('Entrada', 'Entrada'),

                },

            ),
            'importe': NumberInput(
                attrs={
                    'placeholder': 'Importe',
                    'min': 0
                }
            ),
            'descripcion': TextInput(
                attrs={
                    'placeholder': 'Descripcion del movimiento'
                }
            )

        }


class RepCasaPazForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['fecha'].widget.attrs['autofocus'] = True

    class Meta:
        model = rep_casa_paz
        fields = '__all__'
        widgets = {
            'fecha': DateInput(
                attrs={
                    'placeholder': 'Fecha'
                }
            ),
            'asist_total': NumberInput(
                attrs={
                    'placeholder': 'Asistencia Total'
                }
            ),
            'cant_visita': NumberInput(
                attrs={
                    'placeholder': 'Visitas'
                }
            ),
            'cant_nc': NumberInput(
                attrs={
                    'placeholder': 'Nuevos Convertidos'
                }
            ),
            'cant_bajas': NumberInput(
                attrs={
                    'placeholder': 'Cantidad de Bajas'
                }
            ),
            'ofrendas': NumberInput(
                attrs={
                    'placeholder': 'Ofrendas'
                }
            )

        }


class DiezmoForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['fecha'].widget.attrs['autofocus'] = True

    class Meta:
        model = diezmo
        fields = '__all__'
        widgets = {
            'fecha': DateInput(
                attrs={
                    'placeholder': 'Entre la fecha'
                }
            ),
            'importe': NumberInput(
                attrs={
                    'placeholder': 'Importe Total'
                }
            )

        }


class ReporteForm(Form):
    miembros = ModelChoiceField(queryset=membresia.objects.all(), widget=Select(attrs={
        'class': 'form-control select2'
    }))

    conceptos = ModelChoiceField(queryset=concepto.objects.all(), widget=Select(attrs={
        'class': 'form-control select2'
    }))
