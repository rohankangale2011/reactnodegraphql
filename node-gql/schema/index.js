import Employees from '../data/index';
import filter from 'lodash/filter';
import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    } from 'graphql';

const EmployeeType = new GraphQLObjectType({
    name: 'Employees',
    description: 'Employee details',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        organization: {type: new GraphQLNonNull(GraphQLString)},
        profile: {type: new GraphQLNonNull(GraphQLString)},
        designation: {type: new GraphQLNonNull(GraphQLString)}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootSchema",
    fields: () => ({
        employees: {
            args: {
                id: {type: GraphQLInt},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                organization: {type: GraphQLString},
                profile: {type: GraphQLString},
                designation: {type: GraphQLString}
            },
            type: new GraphQLList(EmployeeType),
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    return filter(Employees, args);
                }
                return Employees;
            }
        }
    })
});

const rootSchema =  new GraphQLSchema({
    query: RootQuery
});

export default rootSchema;