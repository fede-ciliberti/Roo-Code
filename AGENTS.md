# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Comandos Específicos del Proyecto

**Instalación inicial del monorepo:**

```bash
npm run install:all  # Instala dependencias en todos los paquetes
```

**Desarrollo local (recomendado):**

```bash
npm run dev  # Inicia desarrollo con reload automático
```

**Build y testing:**

```bash
npm run build    # Build de todos los paquetes
npm run test     # Ejecuta todos los tests (Jest + Vitest)
npm run lint     # ESLint + Prettier
```

**Ejecutar una sola prueba (específico):**

```bash
# Para tests Jest (archivos en __tests__/):
npm test -- --testPathPattern="nombre-archivo"

# Para tests Vitest en webview-ui/:
cd webview-ui && npm test

# Para tests específicos en src/ (Vitest):
npx vitest src/__tests__/archivo.spec.ts
```

## Convenciones de Código Específicas

**Importaciones y estructura:**

- Las interfaces de tipos complejos están definidas en `src/exports/roo-code.d.ts`
- Los providers de API siguen patrones específicos en `src/api/providers/`
- Los archivos de prueba siguen diferentes convenciones: `__tests__/*.test.ts` (Jest) vs `*.spec.ts` (Vitest)

**Estilo de código (ESLint/Prettier):**

- Tabs en lugar de espacios (useTabs: true)
- Ancho de línea: 120 caracteres (printWidth: 120)
- Semicolons: opcional (semi: false)
- Naming conventions específicas para imports y exports

## Patrones No-Obvios del Proyecto

**WASM y archivos de recursos:**

- Los archivos WASM (`tiktoken_bg.wasm`, `tree-sitter.wasm`) se copian automáticamente a `dist/` y `dist/workers/` durante el build
- No modificar manualmente estos archivos en dist/ - se regeneran en cada build

**Estructura monorepo específica:**

- Scripts deben ejecutarse desde directorios específicos: `cd webview-ui && npm test` para tests de UI
- `knip.json` excluye archivos de build, test, y mock del análisis de dependencias
- Los archivos `*.d.ts` en `src/exports/` contienen tipos de API públicos

**Diferentes sistemas de i18n:**

- Extension principal: `src/i18n/locales/` (13 idiomas soportados)
- Webview UI: `webview-ui/src/i18n/locales/` (estructura separada)
- No mezclar archivos de localización entre estos dos sistemas

**Terminales y ejecución de comandos:**

- Dos tipos de terminales: `ExecaTerminal` (fallback) y `VSCode` terminal
- `terminalShellIntegrationDisabled` flag para deshabilitar integración de shell
- Comandos pueden ejecutarse en background con flag `background: true`

**Sistema de diff avanzado:**

- `MultiSearchReplaceDiffStrategy` con `fuzzyMatchThreshold` configurable
- Los cambios se aplican con estrategia específica que maneja múltiples reemplazos
- Diff view provider en `src/integrations/editor/DiffViewProvider.ts`

## Arquitectura Específica

**Task system:**

- `Task.ts` es el core de ejecución con manejo de eventos
- Sistema de checkpoints para guardar/restaurar estado
- MCP integration opcional activada por configuración

**API Providers:**

- Múltiples providers: Anthropic, OpenAI, Gemini, Bedrock, etc.
- Cada provider tiene transformador específico en `src/api/transform/`
- Cache strategy implementada para algunos providers

**Testing patterns:**

- Tests unitarios: Jest en `__tests__/`
- Tests webview: Vitest en `webview-ui/`
- Mock setup en `src/__mocks__/` y `src/core/__mocks__/`
- Configuración específica de Jest para VSCode extension context
