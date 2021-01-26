from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from core.forms import  ConceptoForm
from core.models import concepto


class ConceptoListView(ListView):
    model = concepto
    template_name = 'concepto/list.html'

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
        context['title'] = 'Lista de Conceptos'
        context['create_url'] = reverse_lazy('concepto_create_view')
        context['list_url'] = reverse_lazy('concepto_list_view')
        return context


class ConceptoCreateView(CreateView):
    model = concepto
    form_class = ConceptoForm
    template_name = 'concepto/create.html'
    success_url = reverse_lazy('concepto_list_view')

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
        context['title'] = 'Agregar nuevo Concepto'
        context['action'] = 'add'
        context['list_url'] = reverse_lazy('concepto_list_view')
        context['create_url'] = reverse_lazy('concepto_create_view')
        return context


class ConceptoUpdateView(UpdateView):
    model = concepto
    form_class = ConceptoForm
    template_name = 'concepto/create.html'
    success_url = reverse_lazy('concepto_list_view')

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
        context['title'] = 'Editar Concepto'
        context['action'] = 'edit'
        context['list_url'] = reverse_lazy('concepto_list_view')
        context['edit_url'] = reverse_lazy('concepto_update_view')
        return context


class ConceptoDeleteView(DeleteView):
    model = concepto
    success_url = reverse_lazy('concepto_list_view')

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
        context['list_url'] = reverse_lazy('concepto_list_view')
        return context