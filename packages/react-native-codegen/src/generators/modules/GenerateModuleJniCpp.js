/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

import type {
  Nullable,
  SchemaType,
  NativeModulePropertySchema,
  NativeModuleMethodParamSchema,
  NativeModuleReturnTypeAnnotation,
} from '../../CodegenSchema';

import type {AliasResolver} from './Utils';
const {createAliasResolver, getModules} = require('./Utils');
const {unwrapNullable} = require('../../parsers/flow/modules/utils');

type FilesOutput = Map<string, string>;

const propertyHeaderTemplate =
  'static facebook::jsi::Value __hostFunction_Native::_MODULE_NAME_::SpecJSI_::_PROPERTY_NAME_::(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {';

const propertyCastTemplate =
  'static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, ::_KIND_::, "::_PROPERTY_NAME_::", "::_SIGNATURE_::", args, count);';

const propertyTemplate = `
${propertyHeaderTemplate}
  return ${propertyCastTemplate}
}`;

const propertyDefTemplate =
  '  methodMap_["::_PROPERTY_NAME_::"] = MethodMetadata {::_ARGS_COUNT_::, __hostFunction_Native::_MODULE_NAME_::SpecJSI_::_PROPERTY_NAME_::};';

const moduleTemplate = `
::_TURBOMODULE_METHOD_INVOKERS_::

Native::_MODULE_NAME_::SpecJSI::Native::_MODULE_NAME_::SpecJSI(const JavaTurboModule::InitParams &params)
  : JavaTurboModule(params) {
::_PROPERTIES_MAP_::
}`.trim();

const oneModuleLookupTemplate = `  if (moduleName == "::_MODULE_NAME_::") {
    return std::make_shared<Native::_MODULE_NAME_::SpecJSI>(params);
  }`;

const template = `
/**
 * ${'C'}opyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * ${'@'}generated by codegen project: GenerateModuleJniCpp.js
 */

#include ::_INCLUDE_::

namespace facebook {
namespace react {

::_MODULES_::

std::shared_ptr<TurboModule> ::_LIBRARY_NAME_::_ModuleProvider(const std::string moduleName, const JavaTurboModule::InitParams &params) {
::_MODULE_LOOKUP_::
  return nullptr;
}

} // namespace react
} // namespace facebook
`;

function translateReturnTypeToKind(
  nullableTypeAnnotation: Nullable<NativeModuleReturnTypeAnnotation>,
  resolveAlias: AliasResolver,
): string {
  const [typeAnnotation] = unwrapNullable(nullableTypeAnnotation);
  let realTypeAnnotation = typeAnnotation;
  if (realTypeAnnotation.type === 'TypeAliasTypeAnnotation') {
    realTypeAnnotation = resolveAlias(realTypeAnnotation.name);
  }

  switch (realTypeAnnotation.type) {
    case 'ReservedFunctionValueTypeAnnotation':
      switch (realTypeAnnotation.name) {
        case 'RootTag':
          return 'NumberKind';
        default:
          (realTypeAnnotation.name: empty);
          throw new Error(
            `Invalid ReservedFunctionValueTypeName name, got ${realTypeAnnotation.name}`,
          );
      }
    case 'VoidTypeAnnotation':
      return 'VoidKind';
    case 'StringTypeAnnotation':
      return 'StringKind';
    case 'BooleanTypeAnnotation':
      return 'BooleanKind';
    case 'NumberTypeAnnotation':
      return 'NumberKind';
    case 'DoubleTypeAnnotation':
      return 'NumberKind';
    case 'FloatTypeAnnotation':
      return 'NumberKind';
    case 'Int32TypeAnnotation':
      return 'NumberKind';
    case 'PromiseTypeAnnotation':
      return 'PromiseKind';
    case 'GenericObjectTypeAnnotation':
      return 'ObjectKind';
    case 'ObjectTypeAnnotation':
      return 'ObjectKind';
    case 'ArrayTypeAnnotation':
      return 'ArrayKind';
    default:
      (realTypeAnnotation.type: empty);
      throw new Error(
        `Unknown prop type for returning value, found: ${realTypeAnnotation.type}"`,
      );
  }
}

function translateParamTypeToJniType(
  param: NativeModuleMethodParamSchema,
  resolveAlias: AliasResolver,
): string {
  const {optional, typeAnnotation: nullableTypeAnnotation} = param;
  const [typeAnnotation, nullable] = unwrapNullable(nullableTypeAnnotation);
  const isRequired = !optional && !nullable;

  let realTypeAnnotation = typeAnnotation;
  if (realTypeAnnotation.type === 'TypeAliasTypeAnnotation') {
    realTypeAnnotation = resolveAlias(realTypeAnnotation.name);
  }

  switch (realTypeAnnotation.type) {
    case 'ReservedFunctionValueTypeAnnotation':
      switch (realTypeAnnotation.name) {
        case 'RootTag':
          return !isRequired ? 'Ljava/lang/Double;' : 'D';
        default:
          (realTypeAnnotation.name: empty);
          throw new Error(
            `Invalid ReservedFunctionValueTypeName name, got ${realTypeAnnotation.name}`,
          );
      }
    case 'StringTypeAnnotation':
      return 'Ljava/lang/String;';
    case 'BooleanTypeAnnotation':
      return !isRequired ? 'Ljava/lang/Boolean' : 'Z';
    case 'NumberTypeAnnotation':
      return !isRequired ? 'Ljava/lang/Double;' : 'D';
    case 'DoubleTypeAnnotation':
      return !isRequired ? 'Ljava/lang/Double;' : 'D';
    case 'FloatTypeAnnotation':
      return !isRequired ? 'Ljava/lang/Double;' : 'D';
    case 'Int32TypeAnnotation':
      return !isRequired ? 'Ljava/lang/Double;' : 'D';
    case 'GenericObjectTypeAnnotation':
      return 'Lcom/facebook/react/bridge/ReadableMap;';
    case 'ObjectTypeAnnotation':
      return 'Lcom/facebook/react/bridge/ReadableMap;';
    case 'ArrayTypeAnnotation':
      return 'Lcom/facebook/react/bridge/ReadableArray;';
    case 'FunctionTypeAnnotation':
      return 'Lcom/facebook/react/bridge/Callback;';
    default:
      (realTypeAnnotation.type: empty);
      throw new Error(
        `Unknown prop type for method arg, found: ${realTypeAnnotation.type}"`,
      );
  }
}

function translateReturnTypeToJniType(
  nullableTypeAnnotation: Nullable<NativeModuleReturnTypeAnnotation>,
  resolveAlias: AliasResolver,
): string {
  const [typeAnnotation, nullable] = unwrapNullable(nullableTypeAnnotation);

  let realTypeAnnotation = typeAnnotation;
  if (realTypeAnnotation.type === 'TypeAliasTypeAnnotation') {
    realTypeAnnotation = resolveAlias(realTypeAnnotation.name);
  }

  switch (realTypeAnnotation.type) {
    case 'ReservedFunctionValueTypeAnnotation':
      switch (realTypeAnnotation.name) {
        case 'RootTag':
          return nullable ? 'Ljava/lang/Double;' : 'D';
        default:
          (realTypeAnnotation.name: empty);
          throw new Error(
            `Invalid ReservedFunctionValueTypeName name, got ${realTypeAnnotation.name}`,
          );
      }
    case 'VoidTypeAnnotation':
      return 'V';
    case 'StringTypeAnnotation':
      return 'Ljava/lang/String;';
    case 'BooleanTypeAnnotation':
      return nullable ? 'Ljava/lang/Boolean' : 'Z';
    case 'NumberTypeAnnotation':
      return nullable ? 'Ljava/lang/Double;' : 'D';
    case 'DoubleTypeAnnotation':
      return nullable ? 'Ljava/lang/Double;' : 'D';
    case 'FloatTypeAnnotation':
      return nullable ? 'Ljava/lang/Double;' : 'D';
    case 'Int32TypeAnnotation':
      return nullable ? 'Ljava/lang/Double;' : 'D';
    case 'PromiseTypeAnnotation':
      return 'Lcom/facebook/react/bridge/Promise;';
    case 'GenericObjectTypeAnnotation':
      return 'Lcom/facebook/react/bridge/WritableMap;';
    case 'ObjectTypeAnnotation':
      return 'Lcom/facebook/react/bridge/WritableMap;';
    case 'ArrayTypeAnnotation':
      return 'Lcom/facebook/react/bridge/WritableArray;';
    default:
      (realTypeAnnotation.type: empty);
      throw new Error(
        `Unknown prop type for method return type, found: ${realTypeAnnotation.type}"`,
      );
  }
}

function translateMethodTypeToJniSignature(
  property: NativeModulePropertySchema,
  resolveAlias: AliasResolver,
): string {
  const {name, typeAnnotation} = property;
  let [{returnTypeAnnotation, params}] = unwrapNullable(typeAnnotation);

  params = [...params];
  let processedReturnTypeAnnotation = returnTypeAnnotation;
  const isPromiseReturn = returnTypeAnnotation.type === 'PromiseTypeAnnotation';
  if (isPromiseReturn) {
    processedReturnTypeAnnotation = {
      type: 'VoidTypeAnnotation',
    };
  }

  const argsSignatureParts = params.map(t => {
    return translateParamTypeToJniType(t, resolveAlias);
  });
  if (isPromiseReturn) {
    // Additional promise arg for this case.
    argsSignatureParts.push(
      translateReturnTypeToJniType(returnTypeAnnotation, resolveAlias),
    );
  }
  const argsSignature = argsSignatureParts.join('');
  const returnSignature =
    name === 'getConstants'
      ? 'Ljava/util/Map;'
      : translateReturnTypeToJniType(
          processedReturnTypeAnnotation,
          resolveAlias,
        );

  return `(${argsSignature})${returnSignature}`;
}

function translateMethodForImplementation(
  property: NativeModulePropertySchema,
  resolveAlias: AliasResolver,
): string {
  const [propertyTypeAnnotation] = unwrapNullable(property.typeAnnotation);
  const {returnTypeAnnotation} = propertyTypeAnnotation;

  const numberOfParams =
    propertyTypeAnnotation.params.length +
    (returnTypeAnnotation.type === 'PromiseTypeAnnotation' ? 1 : 0);
  const translatedArguments = propertyTypeAnnotation.params
    .map(param => param.name)
    .concat(
      returnTypeAnnotation.type === 'PromiseTypeAnnotation' ? ['promise'] : [],
    )
    .slice(1)
    .join(':')
    .concat(':');
  if (
    property.name === 'getConstants' &&
    returnTypeAnnotation.type === 'ObjectTypeAnnotation' &&
    returnTypeAnnotation.properties &&
    returnTypeAnnotation.properties.length === 0
  ) {
    return '';
  }
  return propertyTemplate
    .replace(
      /::_KIND_::/g,
      translateReturnTypeToKind(returnTypeAnnotation, resolveAlias),
    )
    .replace(/::_PROPERTY_NAME_::/g, property.name)
    .replace(
      /::_ARGS_::/g,
      numberOfParams === 0
        ? ''
        : (numberOfParams === 1 ? '' : ':') + translatedArguments,
    )
    .replace(
      /::_SIGNATURE_::/g,
      translateMethodTypeToJniSignature(property, resolveAlias),
    );
}

module.exports = {
  generate(
    libraryName: string,
    schema: SchemaType,
    moduleSpecName: string,
  ): FilesOutput {
    const nativeModules = getModules(schema);

    const modules = Object.keys(nativeModules)
      .map(name => {
        const {aliases, properties} = nativeModules[name];
        const resolveAlias = createAliasResolver(aliases);

        const translatedMethods = properties
          .map(property =>
            translateMethodForImplementation(property, resolveAlias),
          )
          .join('\n');
        return moduleTemplate
          .replace(/::_TURBOMODULE_METHOD_INVOKERS_::/g, translatedMethods)
          .replace(
            '::_PROPERTIES_MAP_::',
            properties
              .map(({name: propertyName, typeAnnotation}) => {
                const [{returnTypeAnnotation, params}] = unwrapNullable(
                  typeAnnotation,
                );

                return propertyName === 'getConstants' &&
                  returnTypeAnnotation.type === 'ObjectTypeAnnotation' &&
                  returnTypeAnnotation.properties &&
                  returnTypeAnnotation.properties.length === 0
                  ? ''
                  : propertyDefTemplate
                      .replace(/::_PROPERTY_NAME_::/g, propertyName)
                      .replace(/::_ARGS_COUNT_::/g, params.length.toString());
              })
              .join('\n'),
          )
          .replace(/::_MODULE_NAME_::/g, name);
      })
      .join('\n');

    const moduleLookup = Object.keys(nativeModules)
      .map(name => {
        return oneModuleLookupTemplate.replace(/::_MODULE_NAME_::/g, name);
      })
      .join('\n');

    const fileName = `${moduleSpecName}-generated.cpp`;
    const replacedTemplate = template
      .replace(/::_MODULES_::/g, modules)
      .replace(/::_LIBRARY_NAME_::/g, libraryName)
      .replace(/::_MODULE_LOOKUP_::/g, moduleLookup)
      .replace(/::_INCLUDE_::/g, `"${moduleSpecName}.h"`);
    return new Map([[fileName, replacedTemplate]]);
  },
};
