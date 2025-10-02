export function openModal(modalEl, contentHTML) {
  if (!modalEl) return;
  modalEl.querySelector('#modal-content')?.remove?.();
  const container = document.createElement('div');
  container.id = 'modal-content';
  container.innerHTML = contentHTML;
  modalEl.appendChild(container);
  modalEl.showModal();
}
export function closeModal(modalEl) {
  modalEl?.close();
}
