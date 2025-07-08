<template>
  <div>
    <Form :model="model" :rules="rules" >
      <FormItem label="email" prop="email">
        <Input v-model="model.email"/>
      </FormItem>
      <FormItem label="password" prop="password">
        <Input type="password" v-model="model.password"/>
      </FormItem>
      <div>
        <Button type="primary" @click="submit">Submit</Button>
        <Button @click="reset">Reset</Button>
      </div>
    </Form>
    <pre>{{ model }}</pre>
  </div>
</template>

<script lang="ts" setup>
import  Form from './Form.vue';
import FormItem from './FormItem.vue';
import Input from '../Input/Input.vue';
import Button from '../Button/Button.vue';
import { reactive } from 'vue';
function submit() {
  console.log('Form submitted');
}
function reset() {
  console.log('Form reset');
}

const model = reactive({
  email: '',
  password: ''
});
const rules = {
  email: [
    { type: 'email', required: true, trigger: 'blur' }
  ],
  password: [
    { required: true, min: 6, max: 20, trigger: 'blur',type: 'string' }
  ]
};
</script>