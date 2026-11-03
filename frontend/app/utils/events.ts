type ClickLike = Pick<MouseEvent, 'button' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey'>

/**
 * Clic principal sans modificateur : seul cas où l'on peut intercepter un lien.
 * Ctrl/Cmd/Shift/Alt + clic et clic molette gardent le comportement natif du navigateur.
 * (`defaultPrevented` n'est pas un critère : RouterLink annule déjà le clic pour naviguer.)
 */
export function isPlainPrimaryClick(event: ClickLike): boolean {
  return event.button === 0
    && !event.ctrlKey
    && !event.metaKey
    && !event.shiftKey
    && !event.altKey
}
