/* ============================================
   FORM - Manejo del formulario de contacto
   - Validación de campos
   - Envío de datos
   - Feedback al usuario
============================================ */

// ===== VARIABLES GLOBALES =====
const contactForm = document.getElementById('contactForm');
const cvInput = document.getElementById('cv');

// ===== VALIDACIÓN Y ENVÍO DEL FORMULARIO =====
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevenir envío normal del form
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = {
            tipo: formData.get('tipo'),
            nombre: formData.get('nombre'),
            empresa: formData.get('empresa'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            mensaje: formData.get('mensaje'),
            cv: formData.get('cv')
        };
        
        // ----- VALIDACIONES -----
        
        // Validar campos requeridos
        if (!data.nombre || !data.email || !data.tipo) {
            mostrarNotificacion('Por favor complete todos los campos obligatorios.', 'error');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            mostrarNotificacion('Por favor ingrese un email válido.', 'error');
            return;
        }
        
        // Validar teléfono si fue proporcionado (opcional)
        if (data.telefono) {
            const telefonoRegex = /^[\d\s\-\+\(\)]+$/;
            if (!telefonoRegex.test(data.telefono)) {
                mostrarNotificacion('Por favor ingrese un teléfono válido.', 'error');
                return;
            }
        }
        
        // ----- ENVÍO DEL FORMULARIO -----
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Deshabilitar botón y cambiar texto
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            // AQUÍ INTEGRARÁS EL SERVICIO DE EMAIL
            // Opciones: EmailJS, Formspree, Web3Forms, etc.
            
            // Por ahora, simulamos el envío
            await simularEnvio(data);
            await enviarConEmailJS(data);

            // Éxito
            mostrarNotificacion('¡Gracias por contactarnos! Nos comunicaremos pronto.', 'success');
            contactForm.reset(); // Limpiar formulario
            
        } catch (error) {
            // Error
            console.error('Error al enviar formulario:', error);
            mostrarNotificacion('Hubo un error al enviar el formulario. Intente nuevamente.', 'error');
        } finally {
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// ===== VALIDACIÓN DE ARCHIVO CV =====
if (cvInput) {
    cvInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Validar tipo de archivo
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            
            if (!allowedTypes.includes(file.type)) {
                mostrarNotificacion('Solo se permiten archivos PDF, DOC o DOCX.', 'error');
                cvInput.value = ''; // Limpiar input
                return;
            }
            
            // Validar tamaño (máximo 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB en bytes
            if (file.size > maxSize) {
                mostrarNotificacion('El archivo es demasiado grande. Máximo 5MB.', 'error');
                cvInput.value = ''; // Limpiar input
                return;
            }
            
            // Todo OK
            console.log('✅ Archivo válido:', file.name);
        }
    });
}

// ===== FUNCIÓN: MOSTRAR NOTIFICACIÓN =====
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    
    // Estilos según tipo
    const colores = {
        success: 'linear-gradient(135deg, #10B981, #059669)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)',
        info: 'linear-gradient(135deg, #3B82F6, #2563EB)'
    };
    
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${colores[tipo]};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 350px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
        notificacion.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 5000);
}

// ===== FUNCIÓN: SIMULAR ENVÍO (TEMPORAL) =====
// Esta función simula el envío. La reemplazarás con EmailJS u otro servicio
function simularEnvio(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Datos a enviar:', data);
            resolve(); // Simular éxito
            // reject(new Error('Error simulado')); // Para probar errores
        }, 2000);
    });
}

// ===== INTEGRACIÓN CON EMAILJS (COMENTADA) =====
// Descomentar cuando tengas cuenta de EmailJS

async function enviarConEmailJS(data) {
    //Configuración de EmailJS
    const serviceID = 'service_r838xqc';
    const templateID = 'template_s62vpyg';
    const publicKey = 'A8salOwphI1JBmIbk';
    
    try {
        const response = await emailjs.send(serviceID, templateID, data, publicKey);
        console.log('Email enviado:', response);
        return response;
    } catch (error) {
        console.error('Error al enviar email:', error);
        throw error;
    }
}


console.log('Form JS cargado correctamente');