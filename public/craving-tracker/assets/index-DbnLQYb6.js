(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const l="craving_tracker_state";function f(){const e=localStorage.getItem(l);return e?JSON.parse(e):{logs:[]}}function u(e){localStorage.setItem(l,JSON.stringify(e))}function m(e,t){const n={date:new Date().toISOString().split("T")[0],note:t},o={...e,logs:[...e.logs,n]};return u(o),o}function g(){const e={logs:[]};return u(e),e}function p(e){const t=new Date().toISOString().split("T")[0];return e.logs.some(r=>r.date===t)}function c(e){const t=document.getElementById("app"),r=e.logs.length>0?e.logs.length-1:0;t.innerHTML=`
    <h1>🧭 Craving Tracker</h1>
    <p>Days resisted: <strong>${e.logs.length}</strong></p>
    <div class="progress">
      <div class="bar" style="width: ${Math.min(r*10,100)}%"></div>
    </div>

    <button id="add">Add Day</button>
    <textarea id="note" placeholder="Write a motivation..." required></textarea>

    <button id="reset" class="danger">Reset Progress</button>

    <ul>
      ${e.logs.slice().reverse().map(n=>`<li>${n.date} – ${n.note||""}</li>`).join("")}
    </ul>

    <!-- Confirmation modal (hidden by default) -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to reset all progress?</p>
        <button id="confirmReset" class="danger">Yes, reset</button>
        <button id="cancelReset">Cancel</button>
      </div>
    </div>
  `,h(e)}function h(e){const t=document.querySelector(".bar");if(!t)return;const r=`${Math.min(e.logs.length*10,100)}%`;requestAnimationFrame(()=>{t.style.width=r,t.offsetWidth})}let a=null;function y(e,t="info",r=3e3){d();const n=document.createElement("div");n.className=`snackbar ${t}`,n.textContent=e,n.id="snackbar",document.body.appendChild(n),setTimeout(()=>{n.classList.add("show")},10),a=setTimeout(()=>{d()},r)}function d(){const e=document.getElementById("snackbar");e&&(e.classList.remove("show"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300)),a&&(clearTimeout(a),a=null)}function v(e){let t=e;c(t),document.addEventListener("click",r=>{const n=r.target,o=document.getElementById("modal");if(n.id==="add"){const s=document.getElementById("note"),i=s.value;p(t)?y("Well done! For today you're safe! Resist!","info",3e3):b(s)&&(t=m(t,i),c(t))}n.id==="reset"&&o.classList.add("show"),n.id==="confirmReset"&&(t=g(),o.classList.remove("show"),setTimeout(()=>c(t),300)),(n.id==="cancelReset"||n.classList.contains("modal"))&&o.classList.remove("show")})}function b(e){return e.checkValidity()?!0:(e.reportValidity(),!1)}v(f());
