export default function Modal({
    icon,
    document
}) {
    function mouseOver() {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    }
    function mouseOut() {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }

    function open() {
        document.documentElement.classList.toggle('modal-opened');
    }
    return {
        mouseOver,
        mouseOut,
        open
    }
}