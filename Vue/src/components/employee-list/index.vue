<template>
    <div class="m-employeelist">
        <div v-for="(employee,index) in employees">
            <div class="employeeItem" @click="toogleBio(index)">
                {{employee.name}}
            </div>
            <div class="employeebio" v-show="showPerson == index" @click="showbio(employee.bio)">
                <div>{{employee.bio.stature}}</div>
                <div>{{employee.bio.sex}}</div>
                <div>{{employee.bio.degree}}</div>
                <div>{{employee.bio.looking}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'employee-list',
    data() {
        return {
            showPerson: -1
        }
    },
    props: ['employees'],
    methods: {
        // 初始化
        _init() {},
        toogleBio(index) {
            this.showPerson = this.showPerson == index ? -1 : index;
        },
        showbio(bio) {
            alert("the employee's bio is" + JSON.stringify(bio));
        },

    },
    mounted() {

    }
}
</script>
<style lang="sass" scoped>
.m-employeelist {
    .employeeItem {
        width: 100%;
        height: 50px;
        border-top: 1px solid white;
        line-height: 50px;
        text-align: left;
        background-color: #A4D3EE;
        color: white;
        padding-left: 10px;
    }
    .employeebio {
        text-align: left;
        padding-left: 10px;
    }
}
</style>
