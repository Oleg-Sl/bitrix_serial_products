from rest_framework import views
from django.views.decorators.clickjacking import xframe_options_exempt
from django.shortcuts import render
from django.http import HttpResponse
import logging


# PRODUCT_TEMPLATES = {
#     "armchair": "products/armchair.html",       # 165
#     "bed": "products/bed.html",                 # 189
#     "chair": "products/chair.html",             # 150
#     "melochevka": "products/melochevka.html",   # 162
#     "msp": "products/msp.html",                 # 172
#     "nightstands": "products/nightstands.html", # 188
#     "pouf": "products/pouf.html",               # 167
#     "sofa": "products/sofa.html",               # 158
#     "table": "products/table.html"              # 186
# }



PRODUCT_TEMPLATES = {
    165: "products/armchair.html",
    189: "products/bed.html",
    150: "products/chair.html",
    162: "products/melochevka.html",
    172: "products/msp.html",
    188: "products/nightstands.html",
    167: "products/pouf.html",
    158: "products/sofa.html",
    186: "products/table.html"
}


class InstallApiView(views.APIView):
    @xframe_options_exempt
    def post(self, request):
        template = 'install.html'

        return render(request, template)


class IndexApiView(views.APIView):
    @xframe_options_exempt
    def post(self, request):
        logging.basicConfig(filename='app.log', level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        placement = request.data.get("PLACEMENT")
        placement_option = request.data.get("PLACEMENT_OPTIONS", "")
        logging.info(f"Placement: {placement}")
        logging.info(f"Placement Options: {placement_option}")
        logging.info(f"Received post request with data: {request.data}")

        template = 'index.html'

        data = {
            "portal_url": "https://database.tamamm.ru/bitrix-serial-products"
        }

        return render(request, template, context=data)


class SmartApiView(views.APIView):

    @xframe_options_exempt
    def post(self, request, smart_type_id, smart_id):
        template = PRODUCT_TEMPLATES.get(smart_type_id)

        if not template:
            return HttpResponse("Not found", status=404)

        data = {
            "smart_type_id": smart_type_id,
            "smart_id": smart_id,
            "portal_url": "https://database.tamamm.ru/bitrix-serial-products"
        }

        return render(request, template, context=data)
