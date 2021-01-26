import json

from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, FormView, TemplateView

from core.forms import ReporteForm
from core.models import membresia, diezmo, movimientos


class ReporteCreateView(TemplateView):
    template_name = 'reporte/create.html'
    form_class = ReporteForm
    success_url = reverse_lazy('movimientos_list_view')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                data = json.loads(request.POST['data'])

                for d in data['diezmadores']:
                    addDiezmo = diezmo()
                    addDiezmo.fecha = data['fecha']
                    addDiezmo.importe = float(d['importe'])
                    addDiezmo.miembro_id = d['id']
                    addDiezmo.save()
                for c in data['conceptos']:
                    Mov = movimientos()
                    Mov.fecha = data['fecha']
                    Mov.tipo = 'Entrada'
                    Mov.concepto_id = c['id']
                    Mov.tesoreria_id = 1
                    Mov.importe = float(c['importe'])
                    Mov.descripcion = 'Registro de Reporte General'
                    Mov.save()
                Mov2 = movimientos()
                Mov2.fecha = data['fecha']
                Mov2.tipo = 'Entrada'
                Mov2.concepto_id = 1
                Mov2.tesoreria_id = 1
                Mov2.importe = float(data['importeDiezmadores'])
                Mov2.descripcion = 'Registro de Reporte General Diezmos'
                Mov2.save()

            else:
                data['error'] = 'No ha ingresado ninguna opcion'

        except Exception as e:
            data['error'] = str(e);

        return JsonResponse(data);

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['caja1'] = 'Diezmadores'
        context['caja2'] = 'Otras Entradas'
        context['title'] = 'Captar Reporte'
        context['form'] = ReporteForm()
        context['action'] = 'add'
        context['list_url'] = reverse_lazy('movimientos_list_view')

        return context
