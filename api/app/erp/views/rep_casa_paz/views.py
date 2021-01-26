from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from core.forms import  RepCasaPazForm
from core.models import rep_casa_paz


class RepCasaPazListView(ListView):
    model = rep_casa_paz
    template_name = 'rep_casa_paz/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # def post(self, request, *args, **kwargs):
    #     data = {}
    #     try:
    #
    #         data = concepto.objects.get(pk=request.POST['id']).ToJson()
    #
    #     except Exception as e:
    #         data['error'] = str(e)
    #
    #     return JsonResponse(data);

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Reportes de Casas de Paz'
        context['create_url'] = reverse_lazy('repcasapaz_create_view')
        context['list_url'] = reverse_lazy('repcasapaz_list_view')
        return context


class RepCasaPazCreateView(CreateView):
    model = rep_casa_paz
    form_class = RepCasaPazForm
    template_name = 'rep_casa_paz/create.html'
    success_url = reverse_lazy('repcasapaz_list_view')

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado ninguna opcion'

        except Exception as e:
            data['error'] = str(e);

        return JsonResponse(data);

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Nuevo reporte de Casa de Paz'
        context['action'] = 'add'
        context['list_url'] = reverse_lazy('repcasapaz_list_view')
        context['create_url'] = reverse_lazy('repcasapaz_create_view')
        return context


class RepCasaPazUpdateView(UpdateView):
    model = rep_casa_paz
    form_class = RepCasaPazForm
    template_name = 'rep_casa_paz/create.html'
    success_url = reverse_lazy('repcasapaz_list_view')

    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado ninguna opcion'

        except Exception as e:
            data['error'] = str(e);

        return JsonResponse(data);

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Editar Reporte Casa Paz'
        context['action'] = 'edit'
        context['list_url'] = reverse_lazy('repcasapaz_list_view')
        context['edit_url'] = reverse_lazy('repcasapaz_update_view')
        return context


class RepCasaPazDeleteView(DeleteView):
    model = rep_casa_paz
    success_url = reverse_lazy('repcasapaz_list_view')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:

            self.get_object().delete()

        except Exception as e:
            data['error'] = str(e);

        return JsonResponse(data);

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['action'] = 'delete'
        context['list_url'] = reverse_lazy('repcasapaz_list_view')
        return context
