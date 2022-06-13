<template>
    <div class="content-info">
        <h3>Info del Reporte</h3>
        <div class="content-table">
            <table>
                <tbody>
                <tr>
                    <th>Titulo:</th>
                    <td>{{report.title}}</td>
                </tr>
                 <tr>
                    <th>Desde:</th>
                    <td>{{report.title}}</td>
                </tr>
                 <tr>
                    <th>Hasta:</th>
                    <td>{{report.title}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="content-btns">
            <a class="btn-descargar" v-bind:href="report.report_link" download>Descargar Reporte</a>
            <button class="btn-cerrar" v-on:click="this.$emit('cerrarInfo')" >Cerrar</button>
        </div>
    </div>
</template>

<script>
    export default {
        name:'InfoReporte',
        props:{
            report:Object
        }
    }
</script>

<style  scoped>
    .content-info{
        background: #fff;
        width: 500px;
        padding: 15px 20px;
        position: relative;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: 0.3s;
        margin: 1rem 0;
        box-sizing: border-box;
    }
    .content-table{
        
    }
    table{
        width: 100%;
        border-collapse: collapse;
       margin: 1rem 0;
    }
    table th,td{
        padding: 8px 10px;
       text-align: left;
    }

    table tbody{
    }
    .content-btns{
        margin: 10px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .content-btns .btn-descargar{
        text-decoration: none;
        background: #68BB32;
        padding: 8px 0;
        color: #fff;
        border-radius: 15px;
        width: 170px;
        font-size: 15px;
        cursor: pointer;
    }
    .content-btns .btn-cerrar{
        border: none;
        padding: 10px 0;
        border-radius: 15px;
        background: #a5a5a5;
        color: #fff;
        width: 80px;
        cursor: pointer;
    }
</style>