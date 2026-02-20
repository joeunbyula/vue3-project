import { ref,onUnmounted } from 'vue';
export const useToast = () => {
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('');
    const timeout = ref(null);
    const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastType.value = type;
        showToast.value = true;

        timeout.value = setTimeout(() => {
            toastMessage.value = '';
            toastType.value = '';
            showToast.value = false;
        },2000)
    }

    //메모리 누수 방지
    onUnmounted(() => {
        clearTimeout(timeout.value);
    });

    return {
        showToast,
        toastMessage,
        toastType,
        triggerToast
    }
}