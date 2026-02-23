 // --- 1. GESTÃO DE IDIOMA E INTERSECTION OBSERVER ---
        
        // Observer para animações de entrada ao rolar a página
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

        const translations = {
            pt: {
                nav_home: "Início", nav_about: "Sobre", nav_tech: "Tecnologias", nav_projects: "Projetos", nav_contact: "Contato",
                hero_greeting: "Olá, meu nome é", hero_subtitle: "Sou Desenvolvedora de Software", hero_desc: "Graduada em Ciência da Computação, entusiasta de tecnologia e focada em criar soluções criativas e funcionais que agregam valor a projetos.", hero_btn: "Ver Projetos",
                about_title: "Sobre Mim", about_intro: "Formada em Ciência da Computação, tenho grande interesse na área de Front-End e estou sempre buscando aprender e evoluir tecnicamente. Gosto de transformar ideias em interfaces claras e funcionais, com foco na usabilidade e no impacto para o usuário. Também atuo no Back-End com Java, o que amplia minha visão sobre os projetos e me permite colaborar em diferentes etapas do desenvolvimento. Conciliar essas duas áreas ampliou minha perspectiva e vem consolidando meu caminho como desenvolvedora Fullstack. Dedico-me a criar soluções claras, eficientes e alinhadas às boas práticas, contribuindo para a evolução constante dos projetos.",
                about_comp_title: "⚡ Competência Principal", about_comp_desc: "Desenvolvimento Full Stack, com capacidade de atuar de forma integrada entre front-end e back-end, aplicando boas práticas de engenharia de software, organização de código e atenção à experiência do usuário.",
                about_focus_title: "🎯 Foco Técnico", about_focus_desc: "Construção de interfaces web modernas e responsivas, integração com APIs, preocupação com performance, confiabilidade e impacto das aplicações na experiência do usuário, aliando prática profissional, atuação em NOC e docência em Informática.",
                tech_title: "Tecnologias", tech_subtitle: "Ferramentas e linguagens que utilizo no meu dia a dia:", tech_git: "Uso diário", tech_github:"+20 repositórios",
                projects_title: "Alguns Projetos", proj1_title: "DiarioViva", proj1_desc: "Plataforma web desenvolvida para aproximar pacientes e profissionais de saúde, funcionando como um diário digital compartilhado.", proj2_title: "One Piece", proj2_desc: "Site temático desenvolvido para fãs, reunindo informações, curiosidades e conteúdos exclusivos sobre o universo One Piece.", proj3_title: "MediCare", proj3_desc: "Plataforma web para gerenciar medicamentos e estoques, ajudando usuários a organizar o uso, aumentar a eficiência e reduzir desperdícios.",
                footer_credit: "Design & Construção por Raquel Martins"
            },
            en: {
                nav_home: "Home", nav_about: "About", nav_tech: "Tech", nav_projects: "Projects", nav_contact: "Contact",
                hero_greeting: "Hi, my name is", hero_subtitle: "Software Developer", hero_desc: "Computer Science graduate, technology enthusiast, and focused on creating creative and functional solutions that add value to projects.", hero_btn: "Check out my work",
                about_title: "About Me", about_intro: "Graduated in Computer Science, I have a strong interest in Front-End development and am always eager to learn and grow technically. I enjoy transforming ideas into clear and functional interfaces, focusing on usability and the user experience. I also work on Back-End development with Java, which broadens my perspective on projects and allows me to collaborate across different stages of development. Combining these two areas has expanded my outlook and has been shaping my path as a Fullstack developer. I am committed to delivering clear, efficient solutions aligned with best practices, contributing to the continuous improvement of projects.",
                about_comp_title: "⚡ Core Competency", about_comp_desc: "Full Stack Development, with the ability to work seamlessly between front-end and back-end, applying best practices in software engineering, code organization, and attention to user experience.",
                about_focus_title: "🎯 Technical Focus", about_focus_desc: "Building modern and responsive web interfaces, integrating with APIs, focusing on performance, reliability, and the impact of applications on the user experience, combining professional practice, NOC operations, and teaching in Computer Science.",
                tech_title: "Technologies", tech_subtitle: "Tools and languages I use on a daily basis:", tech_git: "Daily Use", tech_github:"+20 repos",
                projects_title: "Some Things I've Built", proj1_title: "DiarioViva", proj1_desc: "Web platform developed to bring patients and healthcare professionals closer together, functioning as a shared digital diary.", proj2_title: "One Piece", proj2_desc: "Thematic website developed for fans, bringing together information, curiosities, and exclusive content about the One Piece universe.", proj3_title: "MediCare", proj3_desc: "Web platform for managing medications and inventory, helping users organize usage, increase efficiency, and reduce waste.",
                footer_credit: "Designed & Built by Raquel Martins"
            }
        };

        let currentLang = 'pt';
        const langBtn = document.getElementById('lang-btn');
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            langBtn.textContent = currentLang === 'pt' ? 'EN' : 'PT';
            updateLanguage();
        });

        function updateLanguage() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
            });
        }

        // --- 2. CONFIGURAÇÃO 3D ---
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        let fogColorDark = 0x000000;
        let fogColorLight = 0xf3f4f6;
        scene.fog = new THREE.FogExp2(fogColorDark, 0.03); 

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const avatarGroup = new THREE.Group();
        scene.add(avatarGroup);

        const headMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.8 });
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x64ffda, wireframe: true, transparent: true, opacity: 0.1 });
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x4444ff, transparent: true, opacity: 0.3 });
        const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: 0x8888ff, transparent: true, opacity: 0.8 });

        const headGeometry = new THREE.IcosahedronGeometry(1, 1);
        const head = new THREE.Mesh(headGeometry, headMaterial);
        avatarGroup.add(head);

        const wireframeGeo = new THREE.IcosahedronGeometry(1.01, 1);
        const wireframe = new THREE.Mesh(wireframeGeo, wireframeMaterial);
        avatarGroup.add(wireframe);

        const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x64ffda });
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.4, 0.1, 0.85);
        avatarGroup.add(leftEye);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.4, 0.1, 0.85);
        avatarGroup.add(rightEye);

        const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
        const ring1 = new THREE.Mesh(ringGeo, ringMaterial);
        ring1.rotation.x = Math.PI / 2;
        avatarGroup.add(ring1);
        const ring2 = new THREE.Mesh(ringGeo, ringMaterial);
        ring2.rotation.x = Math.PI / 2;
        ring2.rotation.y = Math.PI / 4;
        ring2.scale.set(1.2, 1.2, 1.2);
        avatarGroup.add(ring2);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        for(let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 20; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x64ffda, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        const blueLight = new THREE.PointLight(0x4444ff, 2);
        blueLight.position.set(-5, -5, 2);
        scene.add(blueLight);

        const themeBtn = document.getElementById('theme-btn');
        let isDarkMode = true;
        themeBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('light-mode');
            themeBtn.textContent = isDarkMode ? '☀' : '☾';
            update3DTheme(isDarkMode);
        });

        function update3DTheme(isDark) {
            if (isDark) {
                scene.fog.color.setHex(fogColorDark);
                headMaterial.color.setHex(0x111111);
                wireframeMaterial.color.setHex(0x64ffda);
                wireframeMaterial.opacity = 0.1;
                ringMaterial.color.setHex(0x4444ff);
                particlesMaterial.color.setHex(0x8888ff);
            } else {
                scene.fog.color.setHex(fogColorLight);
                headMaterial.color.setHex(0xffffff); 
                wireframeMaterial.color.setHex(0x2563eb); 
                wireframeMaterial.opacity = 0.2;
                ringMaterial.color.setHex(0x2563eb);
                particlesMaterial.color.setHex(0x4b5563);
            }
        }

        let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        let scrollY = 0;
        window.addEventListener('scroll', () => { scrollY = window.scrollY; });
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const sectionAbout = document.getElementById('about');
        const sectionTech = document.getElementById('tech');
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            avatarGroup.rotation.y += 0.05 * (targetX - avatarGroup.rotation.y);
            avatarGroup.rotation.x += 0.05 * (targetY - avatarGroup.rotation.x);
            avatarGroup.position.y = Math.sin(elapsedTime) * 0.1;

            ring1.rotation.z = elapsedTime * 0.2;
            ring2.rotation.z = elapsedTime * -0.15;
            ring1.rotation.x = (Math.PI / 2) + Math.sin(elapsedTime * 0.5) * 0.2;

            particlesMesh.rotation.y = scrollY * 0.0005;
            particlesMesh.rotation.x = scrollY * 0.0002;

            const aboutOffset = sectionAbout.offsetTop - window.innerHeight / 2;
            const techOffset = sectionTech.offsetTop - window.innerHeight / 2;
            let targetAvatarX = 0; 

            if (scrollY > techOffset) targetAvatarX = -1.5;
            else if (scrollY > aboutOffset) targetAvatarX = 1.5;
            else targetAvatarX = 0;

            avatarGroup.position.x += (targetAvatarX - avatarGroup.position.x) * 0.05;
            renderer.render(scene, camera);
        }
        animate();