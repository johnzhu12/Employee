<template>
    <div class="m-home f-pr">
        <employee-list :employees='employees'></employee-list>
    </div>
</template>
<script>
 import { employeeList } from '../components'
export default {
    name: 'home',
    data() {
        return {
            //add the fake data
           employees : [{
                name: 'john',
                bio: {
                    stature: '183',
                    sex: 'male',
                    degree: 'master',
                    looking: 'hansome'
                }
            }, {
                name: 'love',
                bio: {
                    stature: '160',
                    sex: 'female',
                    degree: 'junior',
                    looking: 'pretty'
                }
            }, {
                name: 'david',
                bio: {
                    stature: '153',
                    sex: 'male',
                    degree: 'junior',
                    looking: 'pretty'
                }
            }, {
                name: 'smith',
                bio: {
                    stature: '130',
                    sex: 'male',
                    degree: 'junior',
                    looking: 'pretty'
                }
            }, {
                name: 'jackie',
                bio: {
                    stature: '143',
                    sex: 'male',
                    degree: 'junior',
                    looking: 'pretty'
                }
            }]

        }
    },
    components: {
       employeeList
    },
    methods: {

    },
    mounted: function() {

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
</style>
