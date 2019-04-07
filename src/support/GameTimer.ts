/**
 */
export class GameTimer {
    // Contador nativo utilizado (setTimeout o requestAnimationFrame)
    private _timer: number;
    
    // Ticks per second
    private readonly _tps: number;
    // Spected tick duration
    private readonly _tickT: number;
    // Elapsed time
    private readonly _startTs: number;
    private _pausedT: number;
    private _lastT: number;
    
    // Instant fields
    private _currentT: number;
    private _deltaT: number;
    
    // Tareas a ejecutar en el próximo ciclo
    private _handlers: Set<(delta: number, time: number) => void>;
    
    
    ///  Singleton  ///
    
    /**
     * Crea una nueva instancia.
     *
     * @param tps - Ticks por segundo.
     */
    public constructor(tps: number) {
        this._tps = tps;
        this._tickT = 1000 / tps;
        
        this._startTs = Date.now();
        this._pausedT = 0;
        this._lastT = this.now();
        
        this._handlers = new Set();
        
        this._timer = setTimeout(this.trigger.bind(this), 1);
    }
    
    private destroy() {
        if (this._timer != null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }
    
    
    ///  Utilización  ///
    
    /**
     * Añade una tarea al planificador, que será ejecutada en el próximo ciclo de reloj.
     *
     * @param fn - Tarea a ejecutar.
     */
    public add(fn: (delta: number, time: number) => void) {
        if (this._timer == null)
            console.debug('Timer is dead.');
        
        this._handlers.add(fn);
    }
    
    public rem(fn: (delta: number, time: number) => void) {
        this._handlers.delete(fn);
    }
    
    /**
     * Elimina todas las tareas pendientes de ejecutar.
     */
    public clear() {
        this._handlers.clear();
    }
    
    
    ///  Internos  ///
    
    /**
     * Planifica el siguiente disparo del planificador (dentro de 1000/60 ms), reiniciando el conteo de periodos si se
     * encontraba detenido.
     */
    private plan() {
        this._timer = setTimeout(this.trigger.bind(this), this._tickT);
    }
    
    /**
     * Disparo del contador nativo. Comprueba si han trascurrido el número de periodos para ejecutar la cola de tareas.
     * De no ser así, planifica el siguiente disparo.
     */
    private trigger() {
        // Planificar siguiente disparo
        this.plan();
        
        // Hacer una copia de la lista de tareas, que podrían ser asíncronas
        const handlers = [...this._handlers.values()];
        this._handlers.clear();
        
        // Tomar el instante actual y ejecutar la lista de tareas pendiente
        this._currentT = this.now();
        this._deltaT = this._currentT - this._lastT;
        this._lastT = this._currentT;
        // ·
        let handler: ((delta: number, time: number) => void);
        for (handler of handlers) {
            handler(this._deltaT, this._currentT);
        }
    }
    
    public now(): number {
        return (Date.now() - this._startTs) - this._pausedT;
    }
}