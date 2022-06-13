<template>
    <div class="reportes-page">
        <h1>Reportes de Usuarios</h1>
        <div class="content-btn">
          <button v-show="!form" @click="form = true" class="btn-generar-reporte" >Generar Reporte</button>  
        </div>
        <div v-show="form">
            <FormReporte  @cerrar-form="form = false" />
        </div>
        <TablaReportes/>
    </div>
</template>

<script>
import TablaReportes from '@/components/TablaReportes.vue';
import FormReporte from '@/components/FormReporte.vue'
    export default {
        name:'ReportesPage',
        components:{
            TablaReportes,
            FormReporte
        },
        data() {
            return {
                form: false
            }
        },
        methods:{

        }
    }
</script>

<style  scoped>
    .reportes-page{
        padding: 0 15%;
    }
    h1{
        font-weight: 700;
        font-size: 3rem;
        color: #fff;
        text-shadow: 1px 1px rgba(0,0,0,0.5);
        margin: 3rem 0;
    }
    .content-btn{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1rem;
    }
    .btn-generar-reporte{
        padding: 12px 20px;
        font-size: 1.2rem;
        font-weight: 700;
        border-radius: .5rem;
        border: none;
        font-weight: 600;
        background: #FFBE12;
        color: #fff;
        cursor: pointer;
    }
    .btn-generar-reporte:hover{
        opacity: 0.9;
    }
    @media (max-width:1200px){
        .reportes-page{
            padding: 0 5%;
        }   
    }
    @media (max-width:768px){
        .reportes-page{
            padding: 0 2%;
        }   
    }
</style>