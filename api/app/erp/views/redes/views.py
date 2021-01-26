from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from core.forms import RedesForm
from core.models import red


class RedesListView(ListView):
    model = red
    template_name = 'redes/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            data = red.objects.all()
            for d in data:
                data = [d.ToJson()]



        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Redes'
        context['create_url'] = reverse_lazy('reds_create_view')
        context['list_url'] = reverse_lazy('reds_list_view')
        return context


class RedesCreateView(CreateView):
    model = red
    form_class = RedesForm
    template_name = 'redes/create.html'
    success_url = reverse_lazy('reds_list_view')

    def ispatch(self, request, *args, **kwargs):
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
        context['title'] = 'Crear Red'
        context['action'] = 'add'
        context['list_url'] = reverse_lazy('reds_list_view')
        context['create_url'] = reverse_lazy('reds_create_view')
        return context


class RedesUpdateView(UpdateView):
    model = red
    form_class = RedesForm
    template_name = 'redes/create.html'
    success_url = reverse_lazy('reds_list_view')

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
        context['title'] = 'Editar Red'
        context['action'] = 'edit'
        context['list_url'] = reverse_lazy('reds_list_view')
        context['edit_url'] = reverse_lazy('reds_update_view')
        return context


class RedesDeleteView(DeleteView):
    model = red
    success_url = reverse_lazy('reds_list_view')

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
        context['list_url'] = reverse_lazy('reds_list_view')
        return context
