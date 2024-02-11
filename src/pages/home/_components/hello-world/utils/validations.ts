export default {
    
    validations : {
        
        required(value, input) {
            if (!value) return { ok:false, message: 'This field is required'}
            return { ok: true }
        },
    
        email(value, input) {
            if (!value) return { ok: true }
            if (!value.match(/(.*)@(.*)\.\w{2,}/)) return { ok: false, message: 'Invalid email' }
            return { ok: true }
        },
    
        number(value, input) {
            if (value.match(/\D/g)) return { ok: false, message:'This field takes only number' }
            return { ok: true }
        }
    },

    masks: {
        number(value, input) {
            return value.replace(/\D/, '')
        }
    }
}