from django.urls import path

from erp.views.concepto.views import ConceptoListView, ConceptoCreateView, ConceptoUpdateView, ConceptoDeleteView
from erp.views.diezmo.views import DiezmoListView, DiezmoCreateView, DiezmoUpdateView, DiezmoDeleteView
from erp.views.membresia.views import MembresiaCreateView, MembresiaListView, MembresiaUpdateView, MembresiaDeleteView
from erp.views.movimientos.views import MovimientosListView, MovimientosCreateView, MovimientosUpdateView, \
    MovimientosDeleteView
from erp.views.redes.views import RedesListView, RedesCreateView, RedesUpdateView, RedesDeleteView
from erp.views.casapaz.views import CasaPazListView, CasaPazCreateView, CasaPazUpdateView, CasaPazDeleteView
from erp.views.rep_casa_paz.views import RepCasaPazListView, RepCasaPazCreateView, RepCasaPazUpdateView, \
    RepCasaPazDeleteView
from erp.views.reportes.views import ReporteCreateView
from erp.views.tesoreria.views import TesoreriaListView, TesoreriaCreateView, TesoreriaUpdateView, TesoreriaDeleteView

urlpatterns = [
    # Redes
    path('red/list/', RedesListView.as_view(), name='reds_list_view'),
    path('red/create/', RedesCreateView.as_view(), name='reds_create_view'),
    path('red/edit/<int:pk>', RedesUpdateView.as_view(), name='reds_edit_view'),
    path('red/delete/<int:pk>', RedesDeleteView.as_view(), name='reds_delete_view'),

    # CasasPaz
    path('casapaz/list/', CasaPazListView.as_view(), name='casapaz_list_view'),
    path('casapaz/create/', CasaPazCreateView.as_view(), name='casapaz_create_view'),
    path('casapaz/edit/<int:pk>', CasaPazUpdateView.as_view(), name='casapaz_edit_view'),
    path('casapaz/delete/<int:pk>', CasaPazDeleteView.as_view(), name='casapaz_delete_view'),

    # Reporte de Casas de Paz
    path('repcasapaz/list/', RepCasaPazListView.as_view(), name='repcasapaz_list_view'),
    path('repcasapaz/create/', RepCasaPazCreateView.as_view(), name='repcasapaz_create_view'),
    path('repcasapaz/edit/<int:pk>', RepCasaPazUpdateView.as_view(), name='repcasapaz_edit_view'),
    path('repcasapaz/delete/<int:pk>', RepCasaPazDeleteView.as_view(), name='repcasapaz_delete_view'),

    # Membresia
    path('membresia/list/', MembresiaListView.as_view(), name='membresia_list_view'),
    path('membresia/create/', MembresiaCreateView.as_view(), name='membresia_create_view'),
    path('membresia/edit/<int:pk>', MembresiaUpdateView.as_view(), name='membresia_edit_view'),
    path('membresia/delete/<int:pk>', MembresiaDeleteView.as_view(), name='membresia_delete_view'),

    # Concepto
    path('concepto/list/', ConceptoListView.as_view(), name='concepto_list_view'),
    path('concepto/create/', ConceptoCreateView.as_view(), name='concepto_create_view'),
    path('concepto/edit/<int:pk>', ConceptoUpdateView.as_view(), name='concepto_edit_view'),
    path('concepto/delete/<int:pk>', ConceptoDeleteView.as_view(), name='concepto_delete_view'),

    # tesoreria
    path('tesoreria/list/', TesoreriaListView.as_view(), name='tesoreria_list_view'),
    path('tesoreria/create/', TesoreriaCreateView.as_view(), name='tesoreria_create_view'),
    path('tesoreria/edit/<int:pk>', TesoreriaUpdateView.as_view(), name='tesoreria_edit_view'),
    path('tesoreria/delete/<int:pk>', TesoreriaDeleteView.as_view(), name='tesoreria_delete_view'),

    # movimientos
    path('movimientos/list/', MovimientosListView.as_view(), name='movimientos_list_view'),
    path('movimientos/create/', MovimientosCreateView.as_view(), name='movimientos_create_view'),
    path('movimientos/edit/<int:pk>', MovimientosUpdateView.as_view(), name='movimientos_edit_view'),
    path('movimientos/delete/<int:pk>', MovimientosDeleteView.as_view(), name='movimientos_delete_view'),

    # diezmos
    path('diezmo/list/', DiezmoListView.as_view(), name='diezmo_list_view'),
    path('diezmo/create/', DiezmoCreateView.as_view(), name='diezmo_create_view'),
    path('diezmo/edit/<int:pk>', DiezmoUpdateView.as_view(), name='diezmo_edit_view'),
    path('diezmo/delete/<int:pk>', DiezmoDeleteView.as_view(), name='diezmo_delete_view'),

    # Reportes
    path('reporte/create/', ReporteCreateView.as_view(), name='reporte_create_view'),
]
