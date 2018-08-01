import Vue, { ComponentOptions, CreateElement, RenderContext, VNode } from "vue";
import * as tsx from "vue-tsx-support";
import { PropValidator, ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";
export declare type VueClass<T> = {
    prototype: T;
    new (...args: any[]): T;
} & typeof Vue;
export declare type PropsDefinition<PropKeys extends string | number | symbol> = {
    [K in PropKeys]: PropValidator<any>;
};
export interface EventsObject<Events> {
    emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
    on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
}
export declare type PropTypedComponentOptions<V extends Vue, Props> = ComponentOptions<V> & {
    props: PropsDefinition<keyof Props>;
};
export declare type RenderFuncitonalComponent<Props> = (this: never, h: CreateElement, context: RenderContext<Props>) => VNode;
export declare type TypedComponentBase<Props> = {
    $props: Props;
} & Vue;
export declare class TypedComponent<Props, ScopedSlots = {}> extends tsx.Component<Props, {}, ScopedSlots> {
    $props: Props;
}
export declare class EvTypedComponent<Props, Events, EventsOn = {}, ScopedSlots = {}> extends tsx.Component<Props, EventsOn, ScopedSlots> {
    $props: Props;
    readonly $events: EventsObject<Events>;
}
export declare abstract class StatefulTypedComponent<Props, Data, ScopedSlots = {}> extends tsx.Component<Props, {}, ScopedSlots> {
    $props: Props;
    $data: Data;
    abstract data(): Data;
}
export declare abstract class StatefulEvTypedComponent<Props, Events, Data, EventsOn = {}, ScopedSlots = {}> extends tsx.Component<Props, EventsOn, ScopedSlots> {
    $props: Props;
    readonly $events: EventsObject<Events>;
    $data: Data;
    abstract data(): Data;
}
export declare type ComponentDecorator<V extends Vue> = (origClass: VueClass<V>) => any;
export declare type StripOptional<T> = T & Record<keyof T, {} | undefined>;
export interface ComponentDecoratorFactory {
    <Props, V extends TypedComponentBase<Props>>(origClass: VueClass<V & TypedComponentBase<Props>>, options: ThisTypedComponentOptionsWithRecordProps<V, {}, {}, {}, StripOptional<Props>> & {
        props: {};
    }): ComponentDecorator<V>;
    <Props, V extends TypedComponentBase<Props> = TypedComponentBase<Props>>(options: ThisTypedComponentOptionsWithRecordProps<V, {}, {}, {}, StripOptional<Props>> & {
        props: {};
    }): ComponentDecorator<V>;
}
export declare const component: ComponentDecoratorFactory;
export declare function functionalComponent<Props>(name: string, props: PropsDefinition<keyof Props>, render: RenderFuncitonalComponent<Props>): tsx.TsxComponent<Vue, Props, {}>;
