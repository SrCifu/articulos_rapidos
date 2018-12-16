/*
 * This file is part of articulos_rapidos
 * Copyright (C) 2018  SrCifu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var nueva_venta_url = 'index.php?page=tpv_recambios';

function show_nuevo_articulo()
{
    $("#modal_nuevo_articulo").modal('show');
    document.f_nuevo_articulo.referencia.focus();
}

function new_articulo()
{
    if (nueva_venta_url !== '') {
        $.ajax({
            type: 'POST',
            url: nueva_venta_url + '&new_articulo=TRUE',
            dataType: 'json',
            data: $("form[name=f_nuevo_articulo]").serialize(),
            success: function (datos) {
                if (typeof datos[0] == 'undefined') {
                    bootbox.alert({
                        message: 'Se ha producido un error al crear el artículo.',
                        title: "<b>Atención</b>"
                    });
                } else {
                	$("form[name=f_nuevo_articulo]")[0].reset();
                    $("input[name='query']").val('');

                    $("#modal_nuevo_articulo").modal('hide');

                    add_articulo(datos[0].referencia, Base64.encode(datos[0].descripcion), datos[0].pvp.toFixed(2), 0, datos[0].codimpuesto, 1);
                }
            },
            error: function () {
                console.log("error");
                bootbox.alert({
                    message: 'Se ha producido un error al crear el artículo.',
                    title: "<b>Atención</b>"
                });
            }
        });
    }
}