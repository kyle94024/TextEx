// vite.config.ts
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import zipPack from "vite-plugin-zip-pack";

// src/manifest.ts
import { defineManifest } from "@crxjs/vite-plugin";
var manifest_default = defineManifest({
  name: "TextEx",
  description: "",
  version: "1.0.0",
  manifest_version: 3,
  icons: {
    "16": "img/textexlogo-16.png",
    "32": "img/textexlogo-32.png",
    "48": "img/textexlogo-48.png",
    "128": "img/textexlogo-128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/textexlogo.jpg"
  },
  options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"]
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        "img/textexlogo-16.png",
        "img/textexlogo-32.png",
        "img/textexlogo-48.png",
        "img/textexlogo-128.png"
      ],
      matches: []
    }
  ],
  permissions: ["scripting", "activeTab", "contextMenus"]
});

// src/read_pages_folder.ts
import globSync from "glob";
var pages = await globSync("pages/*.html");
var arrayKeyValuePairs = pages.map((file) => [
  file.split("\\").slice(-1).toString().split(".html").join(""),
  file
]);
var config = Object.fromEntries(arrayKeyValuePairs);

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        input: config,
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    plugins: [
      crx({ manifest: manifest_default }),
      react(),
      zipPack({
        outDir: `package`,
        inDir: "build",
        outFileName: `${manifest_default.short_name ?? manifest_default.name.replaceAll(" ", "-")}-extension-v${manifest_default.version}.zip`
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInNyYy9yZWFkX3BhZ2VzX2ZvbGRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB6aXBQYWNrIGZyb20gJ3ZpdGUtcGx1Z2luLXppcC1wYWNrJ1xuXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QnXG4vL0B0cy1pZ25vcmVcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vc3JjL3JlYWRfcGFnZXNfZm9sZGVyJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGJ1aWxkOiB7XG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IGNvbmZpZyxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvY2h1bmstW2hhc2hdLmpzJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHBsdWdpbnM6IFtcbiAgICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIHppcFBhY2soe1xuICAgICAgICBvdXREaXI6IGBwYWNrYWdlYCxcbiAgICAgICAgaW5EaXI6ICdidWlsZCcsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3V0RmlsZU5hbWU6IGAke21hbmlmZXN0LnNob3J0X25hbWUgPz8gbWFuaWZlc3QubmFtZS5yZXBsYWNlQWxsKCcgJywgJy0nKX0tZXh0ZW5zaW9uLXYke1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBtYW5pZmVzdC52ZXJzaW9uXG4gICAgICAgIH0uemlwYCxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH1cbn0pXG4iLCAiaW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KHtcbiAgbmFtZTogJ1RleHRFeCcsXG4gIGRlc2NyaXB0aW9uOiAnJyxcbiAgdmVyc2lvbjogJzEuMC4wJyxcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgaWNvbnM6IHtcbiAgICAnMTYnOiAnaW1nL3RleHRleGxvZ28tMTYucG5nJyxcbiAgICAnMzInOiAnaW1nL3RleHRleGxvZ28tMzIucG5nJyxcbiAgICAnNDgnOiAnaW1nL3RleHRleGxvZ28tNDgucG5nJyxcbiAgICAnMTI4JzogJ2ltZy90ZXh0ZXhsb2dvLTEyOC5wbmcnLFxuICB9LFxuICBhY3Rpb246IHtcbiAgICBkZWZhdWx0X3BvcHVwOiAncG9wdXAuaHRtbCcsXG4gICAgZGVmYXVsdF9pY29uOiAnaW1nL3RleHRleGxvZ28uanBnJyxcbiAgfSxcbiAgb3B0aW9uc19wYWdlOiAnb3B0aW9ucy5odG1sJyxcbiAgYmFja2dyb3VuZDoge1xuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxuICAgIHR5cGU6ICdtb2R1bGUnLFxuICB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50L2luZGV4LnRzJ10sXG4gICAgfSxcbiAgXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICdpbWcvdGV4dGV4bG9nby0xNi5wbmcnLFxuICAgICAgICAnaW1nL3RleHRleGxvZ28tMzIucG5nJyxcbiAgICAgICAgJ2ltZy90ZXh0ZXhsb2dvLTQ4LnBuZycsXG4gICAgICAgICdpbWcvdGV4dGV4bG9nby0xMjgucG5nJyxcbiAgICAgIF0sXG4gICAgICBtYXRjaGVzOiBbXSxcbiAgICB9LFxuICBdLFxuICBwZXJtaXNzaW9uczogWydzY3JpcHRpbmcnLCAnYWN0aXZlVGFiJywgJ2NvbnRleHRNZW51cyddLFxufSlcbiIsICJpbXBvcnQgZ2xvYlN5bmMgZnJvbSAnZ2xvYidcblxuY29uc3QgcGFnZXMgPSBhd2FpdCBnbG9iU3luYygncGFnZXMvKi5odG1sJylcblxuY29uc3QgYXJyYXlLZXlWYWx1ZVBhaXJzID0gcGFnZXMubWFwKChmaWxlKSA9PiBbXG4gIGZpbGUuc3BsaXQoJ1xcXFwnKS5zbGljZSgtMSkudG9TdHJpbmcoKS5zcGxpdCgnLmh0bWwnKS5qb2luKCcnKSxcbiAgZmlsZSxcbl0pXG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSBPYmplY3QuZnJvbUVudHJpZXMoYXJyYXlLZXlWYWx1ZVBhaXJzKVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsV0FBVztBQUNwQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhOzs7QUNIcEIsU0FBUyxzQkFBc0I7QUFFL0IsSUFBTyxtQkFBUSxlQUFlO0FBQUEsRUFDNUIsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1Qsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2QsWUFBWTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsSUFDaEIsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2Y7QUFBQSxNQUNFLFNBQVMsQ0FBQyxZQUFZO0FBQUEsTUFDdEIsSUFBSSxDQUFDLHNCQUFzQjtBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsMEJBQTBCO0FBQUEsSUFDeEI7QUFBQSxNQUNFLFdBQVc7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUyxDQUFDO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWEsQ0FBQyxhQUFhLGFBQWEsY0FBYztBQUN4RCxDQUFDOzs7QUN4Q0QsT0FBTyxjQUFjO0FBRXJCLElBQU0sUUFBUSxNQUFNLFNBQVMsY0FBYztBQUUzQyxJQUFNLHFCQUFxQixNQUFNLElBQUksQ0FBQyxTQUFTO0FBQUEsRUFDN0MsS0FBSyxNQUFNLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQUEsRUFDNUQ7QUFDRixDQUFDO0FBRU0sSUFBTSxTQUFTLE9BQU8sWUFBWSxrQkFBa0I7OztBRkMzRCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxJQUFJLEVBQUUsMkJBQVMsQ0FBQztBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUVQLGFBQWEsR0FBRyxpQkFBUyxjQUFjLGlCQUFTLEtBQUssV0FBVyxLQUFLLEdBQUcsZ0JBRXRFLGlCQUFTO0FBQUEsTUFFYixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
