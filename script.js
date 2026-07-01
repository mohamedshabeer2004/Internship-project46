const API = "blog.json";

const app = document.getElementById("app");

async function loadBlog() {

    try {

        const response = await fetch(API);
        const result = await response.json();

        console.log(result);

        app.innerHTML = "";

        renderHeader(result.data.header, result.companyConfig);

        renderComponents(result.data.page.components);

        renderFooter(result.data.footer);

    } catch (error) {

        app.innerHTML = `
        <h2 class="text-center text-red-600 text-2xl mt-10">
            Unable to load blog
        </h2>
        `;

        console.log(error);
    }
}

loadBlog();

function renderComponents(components) {

    components.forEach(component => {

        switch (component.definition.slug) {

            case "blog-title":
                renderBlogTitle(component.data);
                break;

            case "blog-head":
                renderBlogHead(component.data);
                break;

            case "blog-key-note":
                renderKeyNote(component.data);
                break;

            case "blog-description":
                renderDescription(component.data);
                break;

            case "index-faq":
                renderFaq(component.data);
                break;

        }

    });

}



function renderHeader(header, company) {

    const logo = "logo.png";

    app.innerHTML += `

<header class="bg-green-300 shadow-lg rounded-xl mb-8 sticky top-0 z-50">

<div class="flex justify-between items-center p-5">

<div class="flex items-center gap-3">

<img
src="${logo}"
onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Yugme+Boom&background=fff&color=1d4ed8';"
class="w-12 h-12 object-contain">

<h1 class="text-2xl font-bold text-blue-700">
${company.company_name}
</h1>

</div>

<nav
id="nav-links"
class="flex gap-6 items-center text-sm font-medium">
</nav>

</div>

</header>

`;

    const nav = document.getElementById("nav-links");

    header.components.forEach(component => {

        const slug = component.definition.slug;

        if (slug === "header-link" || slug === "header-other") {

            nav.innerHTML += `

<a
href="${component.data.url}"
class="hover:text-blue-600 transition">

${component.data.name}

</a>

`;

        }

        else if (slug === "header-feature-dropdown") {

            renderFeatureDropdown(nav, component.data);

        }

        else if (slug === "header-solutions-dropdown") {

            renderSolutionsDropdown(nav, component.data);

        }

    });

}


function renderFeatureDropdown(nav, data) {

    data.features.forEach(feature => {

        let options = "";

        feature.options.forEach(option => {

            options += `

<li class="px-4 py-2 hover:bg-gray-100">

<a href="${option.url}">

${option.Name}

</a>

</li>

`;

        });

        nav.innerHTML += `

<div class="relative group">

<button class="hover:text-blue-600">

${feature.title} ▼

</button>

<ul class="absolute hidden group-hover:block bg-white shadow-xl rounded-lg w-64">

${options}

</ul>

</div>

`;

    });

}


function renderSolutionsDropdown(nav, data) {

    data.solutions.forEach(solution => {

        let options = "";

        solution.options.forEach(option => {

            options += `

<li class="px-4 py-3 hover:bg-gray-100">

<a href="${option.url}">

<div class="font-semibold">

${option.name}

</div>

<div class="text-xs text-gray-500">

${option.description}

</div>

</a>

</li>

`;

        });

        nav.innerHTML += `

<div class="relative group">

<button class="hover:text-blue-600">

${solution.title} ▼

</button>

<ul class="absolute hidden group-hover:block bg-white shadow-xl rounded-lg w-80">

${options}

</ul>

</div>

`;

    });

}
function renderFooter(footer) {

    const data = footer.components[1].data;

    app.innerHTML += `

<footer class="bg-gray-900 text-white rounded-xl mt-10 p-8">

<h2 class="text-2xl font-bold">

Yugme Boom

</h2>

<p class="mt-3 mb-6">

${data.description}

</p>

<div
id="footer-links"
class="grid md:grid-cols-3 gap-6">
</div>

<hr class="my-6 border-gray-700">

<p class="text-center text-sm">

© 2026 Yugme Boom. All Rights Reserved.

</p>

</footer>

`;

    const links = document.getElementById("footer-links");

    data.footer_others.forEach(section => {

        let html = `

<div>

<h3 class="font-bold mb-3 capitalize">

${section.title}

</h3>

`;

        section.links.forEach(link => {

            html += `

<p class="mb-2">

<a
href="${link.url}"
class="hover:text-blue-400">

${link.name}

</a>

</p>

`;

        });

        html += "</div>";

        links.innerHTML += html;

    });

}


function renderBlogTitle(data) {

    const title = data.title.map(item => item.value).join("");

    app.innerHTML += `
    <div class="bg-white rounded-lg shadow-md mb-6 p-6">

        <h1 class="text-4xl font-bold text-blue-700 leading-tight">
            ${title}
        </h1>

    </div>
    `;

}


function renderBlogHead(data) {

    const category = data.category[0].category_name;

    app.innerHTML += `

<div class="bg-white rounded-lg shadow-md mb-6 p-6">

<img
src="${data.image}"
class="w-full rounded-xl mb-6">

<h2 class="text-3xl font-bold mb-4">

${data.title}

</h2>

<p class="text-gray-700 whitespace-pre-line mb-5">

${data.description}

</p>

<span class="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

${category}

</span>

</div>

`;

}


function renderKeyNote(data) {

    let notes = "";

    data.notes.forEach(note => {

        notes += `
        <li>${note.note}</li>
        `;

    });

    app.innerHTML += `

<div class="bg-white rounded-lg shadow-md mb-6 p-6">

<h2 class="text-2xl font-bold mb-4">

${data.title}

</h2>

<ul class="list-disc pl-6">

${notes}

</ul>

</div>

`;

}


function renderDescription(data) {

    data.description.forEach(item => {

        let content = item.content.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );

        app.innerHTML += `

<div class="bg-white rounded-lg shadow-md mb-6 p-6">

<p class="whitespace-pre-line leading-8">

${content}

</p>

`;

        if (item.image) {

            app.innerHTML += `

<img
src="${item.image}"
class="w-full rounded-xl mt-6">

`;

        }

        app.innerHTML += `

</div>

`;

    });

}

function renderFaq(data) {

    app.innerHTML += `

<div class="bg-white rounded-lg shadow-md mb-6 p-6">

<h2 class="text-3xl font-bold">

${data.title}

</h2>

<p class="text-gray-600 mt-2 mb-6">

${data.description}

</p>

<div id="faq-container"></div>

</div>

`;

    const faq = document.getElementById("faq-container");

    data.questions.forEach((item, index) => {

        faq.innerHTML += `

<div class="border rounded-lg mb-4 overflow-hidden">

<button

class="w-full text-left p-4 bg-gray-100 hover:bg-blue-100 font-semibold"

onclick="toggleFaq(${index})">

${item.question}

</button>

<div

id="faq-${index}"

class="hidden p-4 bg-white">

${item.answer}

</div>

</div>

`;

    });

}


function toggleFaq(index) {

    const answer = document.getElementById(`faq-${index}`);

    answer.classList.toggle("hidden");

}